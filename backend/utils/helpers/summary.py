import re


def trim_to_last_complete_sentence(text):
    sentences = re.split(r"(?<=[.!?])\s+", text)
    complete = ""
    for sentence in sentences:
        if sentence and re.search(r"[.!?]$", sentence.strip()):
            complete += sentence.strip() + " "
    return complete.strip()


def generate_summary(text):
    from transformers import pipeline
    import gc

    model_for_summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

    tokenizer_for_summarizer = model_for_summarizer.tokenizer

    if not text.strip():
        return {"summary": ""}

    word_count = len(text.split())
    if word_count < 30:
        return {"summary": text.strip()}

    input_token_len = len(tokenizer_for_summarizer.encode(text, truncation=True))
    min_length = max(20, int(word_count * 0.3))
    max_length = min(512, max(60, int(word_count * 0.6)))

    if max_length >= input_token_len:
        max_length = max(20, input_token_len - 5)

    if min_length >= max_length:
        min_length = int(max_length * 0.5)

    output = model_for_summarizer(
        text,
        min_length=min_length,
        max_length=max_length,
        do_sample=False,
        truncation=True,
    )

    raw_summary = output[0]["summary_text"].strip()
    final_summary = trim_to_last_complete_sentence(raw_summary)

    del model_for_summarizer
    gc.collect()

    return final_summary or raw_summary
