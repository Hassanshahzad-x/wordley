from textstat import textstat


def analyze_complexity(text):
    lexical = min(100, int((len(set(text.split())) / max(1, len(text.split()))) * 100))
    syntactic = min(100, int(textstat.smog_index(text) * 5))
    semantic = min(100, int(textstat.flesch_kincaid_grade(text) * 3))
    score = round((lexical + syntactic + semantic) / 3)
    level = "High" if score > 66 else "Medium" if score > 33 else "Low"
    return {
        "score": score,
        "level": level,
        "factors": {"lexical": lexical, "syntactic": syntactic, "semantic": semantic},
    }
