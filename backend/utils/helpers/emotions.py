def analyze_emotions(text):
    from transformers import pipeline
    import gc

    model_for_emotions = pipeline(
        "text-classification",
        model="bhadresh-savani/distilbert-base-uncased-emotion",
        top_k=None,
    )

    results = model_for_emotions(text)

    emotions = [
        {"emotion": res["label"].lower(), "confidence": round(res["score"], 2)}
        for result_list in results
        for res in result_list
    ]

    del model_for_emotions
    gc.collect()

    return emotions
