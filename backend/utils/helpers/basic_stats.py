import re


def analyze_basic_stats(text):
    paragraphs = text.strip().split("\n\n")
    sentences = re.split(r"[.!?]+", text)
    words = text.split()

    return {
        "characters": len(text),
        "charactersNoSpaces": len(text.replace(" ", "")),
        "words": len(words),
        "sentences": len([s for s in sentences if s.strip()]),
        "paragraphs": len([p for p in paragraphs if p.strip()]),
        "avgWordsPerSentence": round(
            len(words) / max(1, len([s for s in sentences if s.strip()])), 2
        ),
        "avgSentencesPerParagraph": round(
            len([s for s in sentences if s.strip()])
            / max(1, len([p for p in paragraphs if p.strip()]))
        ),
    }