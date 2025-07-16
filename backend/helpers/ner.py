from collections import defaultdict


ENTITY_FULL_FORMS = {
    "PERSON": "Person",
    "NORP": "Nationality / Religious / Political Group",
    "FAC": "Facility",
    "ORG": "Organization",
    "GPE": "Country / City / State",
    "LOC": "Location",
    "PRODUCT": "Product",
    "EVENT": "Event",
    "WORK_OF_ART": "Work of Art",
    "LAW": "Law",
    "LANGUAGE": "Language",
    "DATE": "Date",
    "TIME": "Time",
    "PERCENT": "Percentage",
    "MONEY": "Money",
    "QUANTITY": "Quantity",
    "ORDINAL": "Ordinal",
    "CARDINAL": "Cardinal Number",
}


def analyze_ner(text):
    from models.models import nlp

    doc = nlp(text)
    entities = defaultdict(list)

    for ent in doc.ents:
        label = ENTITY_FULL_FORMS.get(ent.label_, ent.label_)
        entities[label].append(ent.text)

    for label in entities:
        entities[label] = list(set(entities[label]))

    return dict(entities)
