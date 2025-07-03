import re
import numpy as np
import torch


def analyze_coherence(text):
    sentences = re.split(r"(?<=[.!?]) +", text.strip())
    sentences = [s.strip() for s in sentences if s.strip()]

    embeddings = get_sentence_embeddings(sentences)
    similarities = cosine_sim(embeddings.numpy(), embeddings.numpy())

    adjacent_similarities = [
        float(similarities[i][i + 1]) for i in range(len(sentences) - 1)
    ]

    avg_score = float(np.mean(adjacent_similarities))
    transitions = sum(1 for score in adjacent_similarities if score < 0.5)

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


def get_sentence_embeddings(sentences):
    from transformers import AutoModel, AutoTokenizer
    import gc

    model_for_coherence = AutoModel.from_pretrained(
        "sentence-transformers/all-MiniLM-L6-v2"
    )

    tokenizer_for_coherence = AutoTokenizer.from_pretrained(
        "sentence-transformers/all-MiniLM-L6-v2"
    )

    inputs = tokenizer_for_coherence(
        sentences, return_tensors="pt", padding=True, truncation=True
    )
    with torch.no_grad():
        outputs = model_for_coherence(**inputs)
    embeddings = outputs.last_hidden_state.mean(dim=1)

    del model_for_coherence
    gc.collect()

    return embeddings


def cosine_sim(a, b):
    a = a / np.linalg.norm(a, axis=-1, keepdims=True)
    b = b / np.linalg.norm(b, axis=-1, keepdims=True)
    return np.dot(a, b.T)
