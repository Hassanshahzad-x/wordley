import nltk
import spacy
import spacy.cli

nltk.download("punkt")
nltk.download("punkt_tab")
nltk.download("stopwords")

MODEL_NAME = "en_core_web_sm"


def get_spacy_model():
    try:
        return spacy.load(MODEL_NAME)
    except OSError:
        spacy.cli.download(MODEL_NAME)
        return spacy.load(MODEL_NAME)


nlp = get_spacy_model()
