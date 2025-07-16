import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_URL = "https://api-inference.huggingface.co/models/j-hartmann/emotion-english-distilroberta-base"
HEADERS = {"Authorization": f"Bearer {os.getenv('HUGGING_FACE_API_KEY')}", "Content-Type": "application/json"}


def analyze_emotions(text):
    print("Analyzing emotions")

    response = requests.post(API_URL, headers=HEADERS, json={"inputs": text})

    if response.status_code != 200:
        raise RuntimeError(f"HF API Error: {response.status_code} - {response.text}")

    results = response.json()

    if (
        isinstance(results, list)
        and isinstance(results[0], dict)
        and "label" in results[0]
    ):
        flat_results = results
    elif isinstance(results[0], list):
        flat_results = [item for sublist in results for item in sublist]
    else:
        raise RuntimeError("Unexpected response format from Hugging Face API")

    emotions = [
        {"emotion": res["label"].lower(), "confidence": round(res["score"], 2)}
        for res in flat_results
    ]

    return emotions