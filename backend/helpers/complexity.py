from textstat import textstat
import re
from nltk.corpus import cmudict

cmu = cmudict.dict()


def clean_text_for_textstat(text):
    text = text.replace("-", " ")
    text = re.sub(r"\s+", " ", text).strip()
    words = re.findall(r"\b\w+\b", text)
    known_words = [word for word in words if word.lower() in cmu]
    return " ".join(known_words)


def analyze_complexity(text):
    print("Analyzing complexity")

    cleaned = clean_text_for_textstat(text)

    lexical = min(
        100, int((len(set(cleaned.split())) / max(1, len(cleaned.split()))) * 100)
    )

    try:
        syntactic = min(100, int(textstat.smog_index(cleaned) * 5))
    except Exception as e:
        print("SMOG failed:", e)
        syntactic = 0

    try:
        semantic = min(100, int(textstat.flesch_kincaid_grade(cleaned) * 3))
    except Exception as e:
        print("FK Grade failed:", e)
        semantic = 0

    score = round((lexical + syntactic + semantic) / 3)
    level = "High" if score > 66 else "Medium" if score > 33 else "Low"

    return {
        "score": score,
        "level": level,
        "factors": {
            "lexical": lexical,
            "syntactic": syntactic,
            "semantic": semantic,
        },
    }
