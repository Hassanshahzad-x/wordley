from nltk.sentiment.vader import SentimentIntensityAnalyzer


def analyze_sentiment(text):
    analyzer = SentimentIntensityAnalyzer()
    vs = analyzer.polarity_scores(text)

    compound_score = vs["compound"]
    neg_score = vs["neg"]
    neu_score = vs["neu"]
    pos_score = vs["pos"]

    confidence = compound_score

    scores = {
        "positive": round(pos_score, 2),
        "neutral": round(neu_score, 2),
        "negative": round(neg_score, 2),
    }

    if compound_score >= 0.5:
        label = "Positive"
    elif compound_score <= -0.5:
        label = "Negative"
    else:
        label = "Neutral"

    return {"label": label, "confidence": round(confidence, 2), "scores": scores}
