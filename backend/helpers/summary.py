import os
import re
import requests
from dotenv import load_dotenv

load_dotenv()

def trim_to_last_complete_sentence(text):
    sentences = re.split(r"(?<=[.!?])\s+", text)
    complete = ""
    for sentence in sentences:
        if sentence and re.search(r"[.!?]$", sentence.strip()):
            complete += sentence.strip() + " "
    return complete.strip()


def generate_summary(text):
    word_count = len(text.split())
    if word_count < 30:
        return text.strip()

    min_length = max(20, int(word_count * 0.3))
    max_length = min(512, max(60, int(word_count * 0.6)))

    if min_length >= max_length:
        min_length = int(max_length * 0.5)

    payload = {
        "inputs": text,
        "parameters": {
            "min_length": min_length,
            "max_length": max_length,
            "do_sample": False
        }
    }

    API_URL = "https://router.huggingface.co/hf-inference/models/facebook/bart-large-cnn/pipeline/summarization"
    HEADERS = {"Authorization": f"Bearer {os.getenv('HUGGING_FACE_API_KEY')}"}

    response = requests.post(API_URL, headers=HEADERS, json=payload)

    if response.status_code != 200:
        raise RuntimeError(f"Summarization API failed: {response.status_code} - {response.text}")

    summary_text = response.json()[0]["summary_text"].strip()
    cleaned = trim_to_last_complete_sentence(summary_text)
    return cleaned or summary_text