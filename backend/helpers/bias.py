import os
import requests
from dotenv import load_dotenv

load_dotenv()


def detect_bias(text):
    print("Analyzing bias")
    bias_labels = [
        "biased",
        "unbiased",
        "neutral",
        "balanced",
        "objective",
        "subjective",
        "opinionated",
        "manipulative",
        "persuasive",
        "informative",
        "fact-based",
        "rational",
        "exaggerated",
        "inflammatory",
        "fearmongering",
        "clickbait",
        "emotionally charged",
        "sensational",
        "sarcastic",
        "politically biased",
        "ideologically biased",
        "left-leaning",
        "right-leaning",
        "nationalistic",
        "propagandistic",
        "aggressive",
        "calm",
        "empathetic",
        "alarmist",
        "critical",
        "supportive",
        "satirical",
        "analytical",
        "narrative",
        "reporting",
        "commentary",
    ]

    payload = {
        "inputs": text,
        "parameters": {"candidate_labels": bias_labels, "multi_label": True},
    }

    API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-mnli"
    HEADERS = {"Authorization": f"Bearer {os.getenv('HUGGING_FACE_API_KEY')}"}

    response = requests.post(API_URL, headers=HEADERS, json=payload)

    if response.status_code != 200:
        raise RuntimeError(f"HF API error: {response.status_code} - {response.text}")

    result = response.json()

    top_biases = [
        {"label": label, "confidence": round(score, 2)}
        for label, score in zip(result["labels"], result["scores"])
    ][:3]

    return top_biases
