from spacy.util import load_model

MODEL_NAME = "en_core_web_sm"
_model_cache = {}


def get_spacy_model(model_name="en_core_web_sm"):
    if model_name not in _model_cache:
        _model_cache[model_name] = load_model(model_name)
    return _model_cache[model_name]


nlp = get_spacy_model()
