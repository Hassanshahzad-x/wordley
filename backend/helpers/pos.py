from models.models import get_spacy_model

def analyze_pos(text):
    print("Analyzing pos")
    nlp = get_spacy_model()
    doc = nlp(text)
    grouped = {}
    pos_tuples = [
        (token.text.lower(), token.pos_) for token in doc if token.pos_ != "SPACE"
    ]

    for word, pos in pos_tuples:
        if pos not in grouped:
            grouped[pos] = []
        if word not in grouped[pos]:
            grouped[pos].append(word)

    return grouped
