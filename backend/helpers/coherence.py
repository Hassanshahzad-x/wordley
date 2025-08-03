import os
import re
import numpy as np
import requests
from dotenv import load_dotenv

load_dotenv()

HUGGING_FACE_API_KEY = os.getenv("HUGGING_FACE_API_KEY")
API_URL = "https://router.huggingface.co/hf-inference/models/BAAI/bge-small-en-v1.5/pipeline/feature-extraction"
headers = {"Authorization": f"Bearer {HUGGING_FACE_API_KEY}"}


def get_sentence_embeddings(sentences):
    if isinstance(sentences, str):
        sentences = [sentences]

    payload = {"inputs": sentences}
    response = requests.post(API_URL, headers=headers, json=payload)

    if response.status_code != 200:
        raise RuntimeError(f"HF API Error: {response.status_code} - {response.text}")

    return np.array(response.json())


def cosine_sim(a, b):
    eps = 1e-10
    a_norm = a / (np.linalg.norm(a, axis=-1, keepdims=True) + eps)
    b_norm = b / (np.linalg.norm(b, axis=-1, keepdims=True) + eps)
    return np.dot(a_norm, b_norm.T)


def analyze_coherence(text):
    print("Analyzing coherence")

    sentences = re.split(r"(?<=[.!?])\s+", text.strip())
    sentences = [s.strip() for s in sentences if s.strip()]
    embeddings = get_sentence_embeddings(sentences)
    similarities = cosine_sim(embeddings, embeddings)

    adjacent_similarities = [
        float(similarities[i][i + 1]) for i in range(len(sentences) - 1)
    ]

    avg_score = float(np.mean(adjacent_similarities))
    transitions = sum(1 for score in adjacent_similarities if score >= 0.5)

    if avg_score > 0.70:
        description = "Highly coherent and well-structured"
    elif avg_score > 0.5:
        description = "Moderate coherence with acceptable flow"
    else:
        description = "Low coherence, needs better structure and transitions"

    return {
        "score": round(avg_score, 2),
        "transitionCount": transitions,
        "description": description,
    }
