import traceback

from flask import Flask, request, jsonify
from flask_cors import CORS

from utils.helpers.basic_stats import analyze_basic_stats
from utils.helpers.bias import detect_bias
from utils.helpers.classify import classify_text
from utils.helpers.coherence import analyze_coherence
from utils.helpers.complexity import analyze_complexity
from utils.helpers.emotions import analyze_emotions
from utils.helpers.grammar import grammar_analysis
from utils.helpers.keywords import extract_keywords
from utils.helpers.ner import analyze_ner
from utils.helpers.sentiment import analyze_sentiment
from utils.helpers.summary import generate_summary
from utils.helpers.tone import analyze_tone
from utils.helpers.writing_style import analyze_writing_style
from utils.helpers.readability import analyze_readability
from utils.helpers.language import detect_language
from utils.helpers.pos import analyze_pos

app = Flask(__name__)
CORS(app)


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
            "grammar": grammar_analysis(text),
            "summary": generate_summary(text),
            "bias": detect_bias(text),
            "tone": analyze_tone(text),
            "writingStyle": analyze_writing_style(text),
            "complexity": analyze_complexity(text),
            "readingTime": round(len(text.split()) / 200),
        }

        return jsonify(result)
    except Exception as e:
        traceback.print_exc()

        return jsonify({
            "error": "An error occurred while processing the text.",
            "details": str(e)
        }), 500


@app.route("/test", methods=["GET"])
def demo():
    return jsonify({"hehe": "haha"})

if __name__ == "__main__":
    from waitress import serve
    serve(app, host="0.0.0.0", port=5000)
