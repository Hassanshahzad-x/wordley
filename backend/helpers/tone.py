from nltk.tokenize import sent_tokenize, word_tokenize
from textstat import textstat


def count_passive_voice(sentences):
    from models.models import nlp

    passive_count = 0
    for sent in sentences:
        doc = nlp(sent)
        for token in doc:
            if token.dep_ == "nsubjpass":
                passive_count += 1
                break
    return passive_count


def analyze_tone(text):
    sentences = sent_tokenize(text)
    long_sentences = [s for s in sentences if len(word_tokenize(s)) > 20]
    question_marks = text.count("?")
    exclamations = text.count("!")

    passive_voice_count = count_passive_voice(sentences)
    tone = []
    formality_score = 0

    if len(long_sentences) / max(1, len(sentences)) > 0.3:
        formality_score += 1
    if passive_voice_count / max(1, len(sentences)) > 0.2:
        formality_score += 1
    if exclamations + question_marks <= 1:
        formality_score += 1

    tone.append(
        {
            "tone": "Formal" if formality_score >= 2 else "Informal",
            "strength": "Strong" if formality_score == 3 else "Weak",
        }
    )

    fk_grade = textstat.flesch_kincaid_grade(text)
    smog = textstat.smog_index(text)
    analytical_score = 0

    if fk_grade >= 12:
        analytical_score += 1
    if smog >= 10:
        analytical_score += 1

    tone.append(
        {
            "tone": "Analytical" if analytical_score >= 1 else "Conversational",
            "strength": "Strong" if analytical_score == 2 else "Weak",
        }
    )

    return tone
