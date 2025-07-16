import os


def classify_text(text):
    import requests
    from dotenv import load_dotenv

    load_dotenv()

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

    API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-mnli"

    headers = {
        "Authorization": f"Bearer {os.getenv('HUGGING_FACE_API_KEY')}",
    }

    def query(payload):
        response = requests.post(API_URL, headers=headers, json=payload)
        return response.json()

    response = query(
        {"inputs": text, "parameters": {"candidate_labels": candidate_labels}}
    )

    if "labels" not in response:
        raise ValueError(f"API Error: {response}")

    main_category = response["labels"][0]
    confidence = round(response["scores"][0], 2)

    top_3 = dict(
        [
            (label.lower(), round(score, 2))
            for label, score in zip(response["labels"], response["scores"])
        ][:3]
    )

    return {
        "category": main_category.capitalize(),
        "confidence": confidence,
        "scores": top_3,
    }
