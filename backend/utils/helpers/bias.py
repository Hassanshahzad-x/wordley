def detect_bias(text):
    from transformers import pipeline
    import gc

    model_for_classification = pipeline(
        "zero-shot-classification", model="valhalla/distilbart-mnli-12-3"
    )

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

    result = model_for_classification(text, candidate_labels=bias_labels)

    flagged_biases = [
        {"label": label, "confidence": round(score, 2)}
        for label, score in zip(result["labels"], result["scores"])
    ][:3]

    del model_for_classification
    gc.collect()

    return flagged_biases
