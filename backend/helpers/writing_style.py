import re
from nltk import word_tokenize, sent_tokenize
from textstat import textstat


def analyze_writing_style(text):
    print("Analyzing writing style")
    words = word_tokenize(text)
    sentences = sent_tokenize(text)

    words_clean = [w.lower() for w in words if re.match(r"\w+", w)]
    words_clean = [word.replace("-", " ") for word in words_clean]
    vocab = set(words_clean)
    vocab_diversity = round(len(vocab) / len(words_clean) * 100) if words_clean else 0

    avg_words_per_sentence = (
        round(len(words_clean) / len(sentences)) if sentences else 0
    )

    sentence_lengths = [len(word_tokenize(s)) for s in sentences]
    sentence_variety = {
        "short": sum(1 for l in sentence_lengths if l < 10),
        "medium": sum(1 for l in sentence_lengths if 10 <= l <= 20),
        "long": sum(1 for l in sentence_lengths if l > 20),
    }

    simple = sum(1 for w in words_clean if textstat.syllable_count(w) <= 2)
    complex_ = sum(1 for w in words_clean if textstat.syllable_count(w) > 2)
    total_words = simple + complex_
    simple_pct = round((simple / total_words) * 100) if total_words else 0
    complex_pct = round((complex_ / total_words) * 100) if total_words else 0

    style = (
        "Elaborate Formal"
        if complex_pct > 25 and avg_words_per_sentence > 15
        else "Concise"
    )

    return {
        "style": style,
        "vocabularyDiversity": vocab_diversity,
        "avgWordsPerSentence": avg_words_per_sentence,
        "sentenceVariety": sentence_variety,
        "wordComplexity": {"simple": simple_pct, "complex": complex_pct},
    }
