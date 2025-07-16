import nltk
import spacy

nltk.download("punkt")
nltk.download("stopwords")
MODEL_NAME = "en_core_web_sm"


def get_spacy_model():
    return spacy.load(MODEL_NAME)


nlp = get_spacy_model()
