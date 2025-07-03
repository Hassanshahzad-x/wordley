def analyze_emotions(text):
    from transformers import pipeline
    import gc

    model_for_emotions = pipeline(
        "text-classification",
        model="j-hartmann/emotion-english-distilroberta-base",
        top_k=None,
    )

    results = model_for_emotions(text)

    if isinstance(results[0], list):
        flat_results = [res for sublist in results for res in sublist]
    else:
        flat_results = results

    emotions = [
        {"emotion": res["label"].lower(), "confidence": round(res["score"], 2)}
        for res in flat_results
    ]

    del model_for_emotions
    gc.collect()

    return emotions
