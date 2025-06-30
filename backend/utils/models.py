import language_tool_python
import nltk
from transformers import AutoTokenizer, AutoModel, AutoModelForSequenceClassification, pipeline
import spacy
import spacy.cli

def preload_models():
    nltk.download('punkt')
    nltk.download('punkt_tab')
    nltk.download('stopwords')
    language_tool_python.LanguageTool("en-US")

    try:
        nltk.data.find("sentiment/vader_lexicon.zip")
    except nltk.downloader.DownloadError:
        nltk.download("vader_lexicon")

    try:
        print("Downloaded spacy")
        spacy.load("en_core_web_sm")
    except OSError:
        print("Downloading spacy")
        spacy.cli.download("en_core_web_sm")
        spacy.load("en_core_web_sm")

    print("Downloading bhadresh-savani/distilbert-base-uncased-emotion")
    AutoTokenizer.from_pretrained("bhadresh-savani/distilbert-base-uncased-emotion")
    AutoModelForSequenceClassification.from_pretrained("bhadresh-savani/distilbert-base-uncased-emotion")

    print("Downloading sentence-transformers/all-MiniLM-L6-v2")
    AutoTokenizer.from_pretrained("sentence-transformers/all-MiniLM-L6-v2")
    AutoModel.from_pretrained("sentence-transformers/all-MiniLM-L6-v2")

    print("Downloading sshleifer/distilbart-cnn-12-6")
    AutoTokenizer.from_pretrained("sshleifer/distilbart-cnn-12-6")
    AutoModelForSequenceClassification.from_pretrained("sshleifer/distilbart-cnn-12-6")

    print("Downloading valhalla/distilbart-mnli-12-3")
    AutoTokenizer.from_pretrained("valhalla/distilbart-mnli-12-3")
    AutoModel.from_pretrained("valhalla/distilbart-mnli-12-3")


if __name__ == "__main__":
    preload_models()