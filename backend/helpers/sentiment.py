import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_URL = "https://api-inference.huggingface.co/models/distilbert/distilbert-base-uncased-finetuned-sst-2-english"
HEADERS = {
    "Authorization": f"Bearer {os.getenv('HUGGING_FACE_API_KEY')}",
    "Content-Type": "application/json",
}


def analyze_sentiment(text):
    print("Analyzing sentiment")

    response = requests.post(API_URL, headers=HEADERS, json={"inputs": text})

    if response.status_code != 200:
        raise RuntimeError(f"HF API Error: {response.status_code} - {response.text}")

    results = response.json()

    # Flatten if it's a nested list
    if isinstance(results, list) and isinstance(results[0], list):
        results = results[0]

    if not isinstance(results, list) or not results or not isinstance(results[0], dict):
        raise RuntimeError(f"Unexpected response format: {results}")

    top_result = results[0]

    sentiment = {
        "confidence": round(top_result["score"], 2),
        "label": top_result["label"].capitalize(),
        "scores": {top_result["label"].lower(): round(top_result["score"], 2)},
    }

    return sentiment
