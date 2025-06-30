from collections import defaultdict
import spacy

nlp = spacy.load("en_core_web_sm")


def analyze_ner(text):
    doc = nlp(text)
    entities = defaultdict(list)

    for ent in doc.ents:
        entities[ent.label_].append(ent.text)

    for label in entities:
        entities[label] = list(set(entities[label]))

    return dict(entities)