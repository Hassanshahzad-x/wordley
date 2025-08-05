from textstat import textstat
from nltk.corpus import cmudict
import re

cmu = cmudict.dict()


def clean_text_for_textstat(text):
    words = re.findall(r"\b\w+\b", text)
    known_words = [word for word in words if word.lower() in cmu]
    return " ".join(known_words)


def analyze_readability(text):
    print("Analyzing readability")

    cleaned_text = clean_text_for_textstat(text)

    try:
        flesch = textstat.flesch_reading_ease(cleaned_text)
    except KeyError as e:
        print("Flesch failed due to:", e)
        flesch = None

    try:
        grade = textstat.flesch_kincaid_grade(cleaned_text)
    except KeyError as e:
        print("Grade failed due to:", e)
        grade = None

    level = (
        "Very Easy"
        if flesch and flesch >= 90
        else (
            "Easy"
            if flesch and flesch >= 80
            else (
                "Fairly Easy"
                if flesch and flesch >= 70
                else (
                    "Standard"
                    if flesch and flesch >= 60
                    else (
                        "Fairly Difficult"
                        if flesch and flesch >= 50
                        else (
                            "Difficult" if flesch and flesch >= 30 else "Very Difficult"
                        )
                    )
                )
            )
        )
    )

    return {
        "fleschScore": round(flesch, 2) if flesch is not None else None,
        "grade": int(round(grade)) if grade is not None else None,
        "level": level,
        "avgSentenceLength": textstat.words_per_sentence(cleaned_text),
        "avgSyllablesPerWord": textstat.avg_syllables_per_word(cleaned_text),
        "complexWords": textstat.difficult_words(cleaned_text),
        "syllableCount": textstat.syllable_count(cleaned_text),
    }
