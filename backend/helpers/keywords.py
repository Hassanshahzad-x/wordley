from collections import Counter
import re
from models.models import get_spacy_model


def extract_keywords(text):
    print("Analyzing keywords")
    nlp = get_spacy_model()
    doc = nlp(text.lower())
    candidates = [
        token.lemma_
        for token in doc
        if token.pos_ in ("NOUN", "PROPN")
        and not token.is_stop
        and re.match(r"^[a-zA-Z\-]+$", token.text)
    ]

    keyword_counts = Counter(candidates)

    if not keyword_counts:
        return []

    max_freq = max(keyword_counts.values())

    keywords_json = [
        {"word": word, "frequency": freq, "weight": round(freq / max_freq, 2)}
        for word, freq in keyword_counts.items()
    ]

    return keywords_json
