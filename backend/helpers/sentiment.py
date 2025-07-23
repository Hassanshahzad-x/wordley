import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_URL = "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment"
HEADERS = {
    "Authorization": f"Bearer {os.getenv('HUGGING_FACE_API_KEY')}",
    "Content-Type": "application/json",
}


def analyze_sentiment(text):
    print("Analyzing sentiment")

    response = requests.post(API_URL, headers=HEADERS, json={"inputs": text})

    results = response.json()

    if isinstance(results, list) and isinstance(results[0], list):
        results = results[0]

    if not isinstance(results, list) or not results:
        raise RuntimeError(f"Unexpected response format: {results}")

    label_map = {"LABEL_0": "negative", "LABEL_1": "neutral", "LABEL_2": "positive"}

    scores = {
        label_map.get(entry["label"], entry["label"]): round(entry["score"], 2)
        for entry in results
    }

    top_result = max(results, key=lambda x: x["score"])
    top_label = label_map.get(top_result["label"], top_result["label"])

    sentiment = {
        "confidence": round(top_result["score"], 2),
        "label": top_label,
        "scores": scores,
    }

    return sentiment
