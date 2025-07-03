# 🧠 Wordley - AI-Powered Text Analyzer

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Tech](https://img.shields.io/badge/Stack-React%20%7C%20Flask%20%7C%20NLP-brightgreen)

Wordley is a smart and responsive web app that analyzes your text and provides **AI-driven insights** including sentiment, emotion, readability, tone, keywords, grammar score, and much more — all in real time.

---

## ✨ Features

✅ AI-Powered Text Analysis  
✅ Named Entity Recognition & Part of Speech Tagging  
✅ Readability Metrics & Complexity Scores  
✅ Emotions & Sentiment Detection  
✅ Summarization & Writing Style Detection  

---

## ⚙️ Tech Stack

| Frontend | Backend | AI/NLP Models | Deployment |
|----------|---------|---------------|------------|
| React.js | Flask   | spaCy, Transformers, NLTK | Netlify + Render |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Hassanshahzad-x/wordley.git
cd wordley
```

### 2. Start the server
```
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

// Run this once to download models, might take an hour
cd models
python models.py 

python server.py
```

### 3. Start the UI
```
cd frontend
npm install
npm run dev
```

### 🤖 AI LLMs Used
* cardiffnlp/twitter-roberta-base-sentiment-latest
* facebook/bart-large-cnn
* facebook/bart-large-mnli
* sentence-transformers/all-MiniLM-L6-v2
* j-hartmann/emotion-english-distilroberta-base

### 📄 License

MIT License - free for personal and commercial use.

### 💡 Author

Made with ❤️ by Hassan Shahzad
