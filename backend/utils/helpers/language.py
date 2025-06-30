from langcodes import Language
from langdetect import detect_langs


def detect_language(text):
    detections = detect_langs(text)
    top_detection = detections[0]
    lang_code = top_detection.lang
    confidence = round(top_detection.prob, 3)

    lang_name = Language.get(lang_code).display_name().capitalize()

    return  {"code": lang_code, "name": lang_name, "confidence": confidence}
