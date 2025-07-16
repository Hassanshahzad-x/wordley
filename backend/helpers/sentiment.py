import os
from dotenv import load_dotenv

load_dotenv()
def analyze_sentiment(text):
    from huggingface_hub import InferenceClient

    client = InferenceClient(
        provider="hf-inference", api_key=f"{os.getenv('HUGGING_FACE_API_KEY')}"
    )

    results = client.text_classification(
        text,
        model="distilbert/distilbert-base-uncased-finetuned-sst-2-english",
    )

    top_result = results[0]

    sentiment = {
        "confidence": round(top_result["score"], 2),
        "label": top_result["label"].capitalize(),
        "scores": {top_result["label"].lower(): round(top_result["score"], 2)},
    }

    return sentiment