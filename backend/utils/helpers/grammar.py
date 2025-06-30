import language_tool_python

tool = language_tool_python.LanguageTool("en-US")


def grammar_analysis(text):
    matches = tool.check(text)

    issues = [match.message for match in matches]

    word_count = len(text.split())
    score = max(0, 100 - len(matches) * 2) if word_count > 0 else 100

    return {"score": score, "issues": issues}