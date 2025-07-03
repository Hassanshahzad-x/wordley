def analyze_sentiment(text):
    from transformers import pipeline
    import gc

    sentiment_pipeline = pipeline(
        "text-classification",
        model="cardiffnlp/twitter-roberta-base-sentiment-latest",
        top_k=None,
    )

    results = sentiment_pipeline(text)[0]
    scores = {res["label"].lower(): round(res["score"], 2) for res in results}
    best = max(results, key=lambda x: x["score"])

    sentiment = {
        "confidence": round(best["score"], 2),
        "label": best["label"].capitalize(),
        "scores": scores,
    }

    del sentiment_pipeline
    gc.collect()

    return sentiment