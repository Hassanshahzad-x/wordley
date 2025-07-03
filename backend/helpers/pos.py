import spacy
import spacy.cli

try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    spacy.cli.download("en_core_web_sm")
    nlp = spacy.load("en_core_web_sm")


def analyze_pos(text):
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
