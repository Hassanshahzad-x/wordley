import traceback

from flask import Flask, request, jsonify
from flask_cors import CORS

from helpers.basic_stats import analyze_basic_stats
from helpers.bias import detect_bias
from helpers.classify import classify_text
from helpers.coherence import analyze_coherence
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

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/", methods=["GET"])
def health():
    return jsonify({"status": "SERVER IS UP AND RUNNING"}), 200


@app.route("/analyze", methods=["POST"])
def analyze_text():
    try:
        data = request.get_json()
        text = data.get("text", "")

        if not text.strip():
            return jsonify({"error": "Text is empty"}), 400

        result = {
            "basicStats": analyze_basic_stats(text),
            "sentiment": analyze_sentiment(text),
            "emotions": analyze_emotions(text),
            "entities": analyze_ner(text),
            "pos": analyze_pos(text),
            "keywords": extract_keywords(text),
            "readability": analyze_readability(text),
            "language": detect_language(text),
            "classification": classify_text(text),
            "coherence": analyze_coherence(text),
            # "grammar": grammar_analysis(text),
            "summary": generate_summary(text),
            "bias": detect_bias(text),
            "tone": analyze_tone(text),
            "writingStyle": analyze_writing_style(text),
            "complexity": analyze_complexity(text),
            "readingTime": round(len(text.split()) / 200),
        }

        return jsonify(result), 200
    except Exception as e:
        traceback.print_exc()

        return (
            jsonify(
                {
                    "error": "An error occurred while processing the text.",
                    "details": str(e),
                }
            ),
            500,
        )


# if __name__ == "__main__":
#     app.run(debug=True, port=5001)
