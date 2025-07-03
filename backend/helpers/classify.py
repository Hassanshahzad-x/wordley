def classify_text(text):
    from transformers import pipeline
    import gc

    model_for_classification = pipeline(
        "zero-shot-classification", model="facebook/bart-large-mnli", cache_dir="/tmp"
    )

    candidate_labels = [
        "academic",
        "business",
        "news",
        "creative",
        "medical",
        "legal",
        "scientific",
        "financial",
        "educational",
        "political",
        "historical",
        "journalistic",
        "technological",
        "psychological",
        "philosophical",
        "environmental",
        "social",
        "spiritual",
        "cultural",
        "fiction",
        "non-fiction",
        "instructional",
        "review",
        "report",
        "storytelling",
        "narrative",
        "poetic",
        "descriptive",
        "informative",
        "persuasive",
        "analytical",
        "reflective",
        "argumentative",
        "opinion",
        "explanation",
        "announcement",
        "marketing",
        "advertising",
        "instruction",
        "tutorial",
        "discussion",
        "guideline",
        "personal",
        "motivational",
        "inspirational",
        "entertainment",
        "satirical",
        "news commentary",
        "summary",
        "product description",
    ]

    result = model_for_classification(text, candidate_labels)

    main_category = result["labels"][0]
    confidence = round(result["scores"][0], 2)

    temp_list = [
        (label.lower(), round(score, 2))
        for label, score in zip(result["labels"], result["scores"])
    ]
    scores = dict(temp_list[:3])

    del model_for_classification
    gc.collect()

    return {
        "category": main_category.capitalize(),
        "confidence": confidence,
        "scores": scores,
    }
