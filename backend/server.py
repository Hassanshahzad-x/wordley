import traceback
from flask import Flask, request, jsonify
from flask_cors import CORS
from concurrent.futures import ThreadPoolExecutor

app = Flask(__name__)
CORS(app)

executor = ThreadPoolExecutor(max_workers=4)


@app.route("/", methods=["GET"])
def health():
    return jsonify({"status": "SERVER IS UP AND RUNNING"}), 200


@app.route("/analyze", methods=["POST"])
def analyze_text():
    from helpers.basic_stats import analyze_basic_stats
    from helpers.classify import classify_text
    from helpers.coherence import analyze_coherence
    from helpers.bias import detect_bias
    from helpers.complexity import analyze_complexity
    from helpers.emotions import analyze_emotions
    from helpers.keywords import extract_keywords
    from helpers.ner import analyze_ner
    from helpers.sentiment import analyze_sentiment
    from helpers.summary import generate_summary
    from helpers.tone import analyze_tone
    from helpers.writing_style import analyze_writing_style
    from helpers.readability import analyze_readability
    from helpers.language import detect_language
    from helpers.pos import analyze_pos

    try:
        data = request.get_json()
        text = data.get("text", "")

        if not text.strip():
            return {"error": "No text found"}, 400

        batch1 = {
            "basicStats": executor.submit(analyze_basic_stats, text),
            "sentiment": executor.submit(analyze_sentiment, text),
            "emotions": executor.submit(analyze_emotions, text),
            "entities": executor.submit(analyze_ner, text),
            "pos": executor.submit(analyze_pos, text),
        }

        batch2 = {
            "keywords": executor.submit(extract_keywords, text),
            "readability": executor.submit(analyze_readability, text),
            "language": executor.submit(detect_language, text),
            "classification": executor.submit(classify_text, text),
            "coherence": executor.submit(analyze_coherence, text),
        }

        batch3 = {
            "summary": executor.submit(generate_summary, text),
            "bias": executor.submit(detect_bias, text),
            "tone": executor.submit(analyze_tone, text),
            "writingStyle": executor.submit(analyze_writing_style, text),
            "complexity": executor.submit(analyze_complexity, text),
        }

        result = {}

        for batch in [batch1, batch2, batch3]:
            for key, future in batch.items():
                result[key] = future.result()

        result["readingTime"] = round(len(text.split()) / 200)

        return jsonify(result), 200
    except Exception as e:
        traceback.print_exc()
        return {"error": str(e)}, 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
