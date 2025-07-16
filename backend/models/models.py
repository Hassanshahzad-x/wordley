import nltk
import spacy
import spacy.cli


nltk.download("punkt")
nltk.download("punkt_tab")
nltk.download("stopwords")

# try:
#     nltk.data.find("sentiment/vader_lexicon.zip")
# except nltk.downloader.DownloadError:
#     nltk.download("vader_lexicon")

try:
    print("Downloaded spacy")
    spacy.load("en_core_web_sm")
except OSError:
    print("Downloading spacy")
    spacy.cli.download("en_core_web_sm")
    spacy.load("en_core_web_sm")

# print("Downloading sentence-transformers/all-MiniLM-L6-v2")
# AutoTokenizer.from_pretrained("sentence-transformers/all-MiniLM-L6-v2")
# AutoModel.from_pretrained("sentence-transformers/all-MiniLM-L6-v2")

# print("Downloading j-hartmann/emotion-english-distilroberta-base")
# AutoTokenizer.from_pretrained("j-hartmann/emotion-english-distilroberta-base")
# AutoModelForSequenceClassification.from_pretrained(
#     "j-hartmann/emotion-english-distilroberta-base"
# )

# print("Downloading facebook/bart-large-mnli")
# AutoTokenizer.from_pretrained("facebook/bart-large-mnli")
# AutoModel.from_pretrained("facebook/bart-large-mnli")

# print("Downloading facebook/bart-large-cnn")
# BartTokenizer.from_pretrained("facebook/bart-large-cnn")
# BartForConditionalGeneration.from_pretrained("facebook/bart-large-cnn")