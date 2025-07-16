from textstat import textstat


def analyze_readability(text):
    print("Analyzing readability")
    flesch = textstat.flesch_reading_ease(text)
    grade = textstat.flesch_kincaid_grade(text)
    level = (
        "Very Easy"
        if flesch >= 90
        else (
            "Easy"
            if flesch >= 80
            else (
                "Fairly Easy"
                if flesch >= 70
                else (
                    "Standard"
                    if flesch >= 60
                    else (
                        "Fairly Difficult"
                        if flesch >= 50
                        else "Difficult" if flesch >= 30 else "Very Difficult"
                    )
                )
            )
        )
    )

    return {
        "fleschScore": round(flesch, 2),
        "grade": int(round(grade)),
        "level": level,
        "avgSentenceLength": textstat.words_per_sentence(text),
        "avgSyllablesPerWord": textstat.avg_syllables_per_word(text),
        "complexWords": textstat.difficult_words(text),
        "syllableCount": textstat.syllable_count(text),
    }