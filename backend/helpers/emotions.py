import os

from dotenv import load_dotenv

load_dotenv()
def analyze_emotions(text):
    print("Analyzing emotions")
    from huggingface_hub import InferenceClient

    client = InferenceClient(
        provider="hf-inference", api_key=f"{os.getenv('HUGGING_FACE_API_KEY')}"
    )

    results = client.text_classification(
        text, model="j-hartmann/emotion-english-distilroberta-base"
    )

    if isinstance(results[0], list):
        flat_results = [res for sublist in results for res in sublist]
    else:
        flat_results = results

    emotions = [
        {"emotion": res["label"].lower(), "confidence": round(res["score"], 2)}
        for res in flat_results
    ]

    return emotions
