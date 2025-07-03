import React, { useState, useEffect } from "react";
import {
  Moon,
  Sun,
  Download,
  FileText,
  Brain,
  Zap,
  FileWarning,
} from "lucide-react";
import TextEditor from "./components/TextEditor";
import AnalysisPanel from "./components/AnalysisPanel";
import { analyzeText } from "./utils/nlpAnalyzer";
import "./styles/App.css";

function App() {
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  function startAnalyzing() {
    if (!text.trim()) {
      setAnalysis(null);
      return;
    }

    setIsAnalyzing(true);
    const timer = setTimeout(() => {
      // const data = {
      //   basicStats: {
      //     avgSentencesPerParagraph: 4,
      //     avgWordsPerSentence: 27.75,
      //     characters: 1377,
      //     charactersNoSpaces: 1157,
      //     paragraphs: 2,
      //     sentences: 8,
      //     words: 222,
      //   },
      //   bias: [
      //     {
      //       confidence: 0.14,
      //       label: "informative",
      //     },
      //     {
      //       confidence: 0.11,
      //       label: "narrative",
      //     },
      //     {
      //       confidence: 0.1,
      //       label: "reporting",
      //     },
      //   ],
      //   classification: {
      //     category: "Informative",
      //     confidence: 0.08,
      //     scores: {
      //       announcement: 0.07,
      //       informative: 0.08,
      //       reflective: 0.07,
      //     },
      //   },
      //   coherence: {
      //     description: "Low coherence, needs better structure and transitions",
      //     score: 0.37,
      //     transitionCount: 5,
      //   },
      //   complexity: {
      //     factors: {
      //       lexical: 62,
      //       semantic: 45,
      //       syntactic: 83,
      //     },
      //     level: "Medium",
      //     score: 63,
      //   },
      //   emotions: [
      //     {
      //       confidence: 0.68,
      //       emotion: "positive",
      //     },
      //     {
      //       confidence: 0.31,
      //       emotion: "neutral",
      //     },
      //     {
      //       confidence: 0.01,
      //       emotion: "negative",
      //     },
      //   ],
      //   entities: {
      //     CARDINAL: ["two", "billions"],
      //     DATE: ["monthly"],
      //     ORG: ["PTV", "Energy Power Division"],
      //     PERSON: ["Khan Leghari", "Awais Ahmed"],
      //   },
      //   grammar: {
      //     issues: [
      //       "You should probably use “price”.",
      //       "In this context, “per-unit” forms an adjective and is spelled with a hyphen.",
      //       "Possible spelling mistake found.",
      //       "Possible spelling mistake found.",
      //       "Possible spelling mistake found.",
      //       "The verb ‘depend’ can be stative. If ‘depending’ describes a state, change the sentence structure and use the base form of the verb.",
      //       "Use a comma before ‘and’ if it connects two independent clauses (unless they are closely connected and short).",
      //     ],
      //     score: 86,
      //   },
      //   keywords: [
      //     {
      //       frequency: 1,
      //       weight: 0.17,
      //       word: "negotiation",
      //     },
      //     {
      //       frequency: 1,
      //       weight: 0.17,
      //       word: "bank",
      //     },
      //     {
      //       frequency: 1,
      //       weight: 0.17,
      //       word: "debt",
      //     },
      //     {
      //       frequency: 3,
      //       weight: 0.5,
      //       word: "issue",
      //     },
      //     {
      //       frequency: 1,
      //       weight: 0.17,
      //       word: "achievement",
      //     },
      //     {
      //       frequency: 3,
      //       weight: 0.5,
      //       word: "minister",
      //     },
      //     {
      //       frequency: 4,
      //       weight: 0.67,
      //       word: "price",
      //     },
      //     {
      //       frequency: 2,
      //       weight: 0.33,
      //       word: "petroleum",
      //     },
      //     {
      //       frequency: 1,
      //       weight: 0.17,
      //       word: "market",
      //     },
      //     {
      //       frequency: 1,
      //       weight: 0.17,
      //       word: "advantage",
      //     },
      //     {
      //       frequency: 2,
      //       weight: 0.33,
      //       word: "relief",
      //     },
      //     {
      //       frequency: 6,
      //       weight: 1,
      //       word: "power",
      //     },
      //     {
      //       frequency: 5,
      //       weight: 0.83,
      //       word: "consumer",
      //     },
      //     {
      //       frequency: 1,
      //       weight: 0.17,
      //       word: "product",
      //     },
      //     {
      //       frequency: 1,
      //       weight: 0.17,
      //       word: "adjustment",
      //     },
      //     {
      //       frequency: 1,
      //       weight: 0.17,
      //       word: "decision",
      //     },
      //     {
      //       frequency: 1,
      //       weight: 0.17,
      //       word: "rebasing",
      //     },
      //     {
      //       frequency: 1,
      //       weight: 0.17,
      //       word: "unit",
      //     },
      //     {
      //       frequency: 1,
      //       weight: 0.17,
      //       word: "rate",
      //     },
      //     {
      //       frequency: 1,
      //       weight: 0.17,
      //       word: "ptv",
      //     },
      //     {
      //       frequency: 1,
      //       weight: 0.17,
      //       word: "fee",
      //     },
      //     {
      //       frequency: 1,
      //       weight: 0.17,
      //       word: "bill",
      //     },
      //     {
      //       frequency: 2,
      //       weight: 0.33,
      //       word: "challenge",
      //     },
      //     {
      //       frequency: 1,
      //       weight: 0.17,
      //       word: "sector",
      //     },
      //     {
      //       frequency: 1,
      //       weight: 0.17,
      //       word: "theft",
      //     },
      //     {
      //       frequency: 1,
      //       weight: 0.17,
      //       word: "difference",
      //     },
      //     {
      //       frequency: 1,
      //       weight: 0.17,
      //       word: "production",
      //     },
      //     {
      //       frequency: 1,
      //       weight: 0.17,
      //       word: "consumption",
      //     },
      //     {
      //       frequency: 1,
      //       weight: 0.17,
      //       word: "electricity",
      //     },
      //     {
      //       frequency: 1,
      //       weight: 0.17,
      //       word: "solarization",
      //     },
      //     {
      //       frequency: 2,
      //       weight: 0.33,
      //       word: "country",
      //     },
      //     {
      //       frequency: 1,
      //       weight: 0.17,
      //       word: "way",
      //     },
      //     {
      //       frequency: 1,
      //       weight: 0.17,
      //       word: "path",
      //     },
      //     {
      //       frequency: 1,
      //       weight: 0.17,
      //       word: "progress",
      //     },
      //     {
      //       frequency: 1,
      //       weight: 0.17,
      //       word: "tariff",
      //     },
      //     {
      //       frequency: 1,
      //       weight: 0.17,
      //       word: "household",
      //     },
      //     {
      //       frequency: 1,
      //       weight: 0.17,
      //       word: "energy",
      //     },
      //     {
      //       frequency: 1,
      //       weight: 0.17,
      //       word: "division",
      //     },
      //     {
      //       frequency: 1,
      //       weight: 0.17,
      //       word: "sardar",
      //     },
      //     {
      //       frequency: 1,
      //       weight: 0.17,
      //       word: "awais",
      //     },
      //     {
      //       frequency: 1,
      //       weight: 0.17,
      //       word: "ahmed",
      //     },
      //     {
      //       frequency: 1,
      //       weight: 0.17,
      //       word: "khan",
      //     },
      //     {
      //       frequency: 1,
      //       weight: 0.17,
      //       word: "leghari",
      //     },
      //     {
      //       frequency: 1,
      //       weight: 0.17,
      //       word: "ceremony",
      //     },
      //     {
      //       frequency: 1,
      //       weight: 0.17,
      //       word: "use",
      //     },
      //     {
      //       frequency: 1,
      //       weight: 0.17,
      //       word: "technology",
      //     },
      //     {
      //       frequency: 1,
      //       weight: 0.17,
      //       word: "transparency",
      //     },
      //     {
      //       frequency: 1,
      //       weight: 0.17,
      //       word: "billion",
      //     },
      //     {
      //       frequency: 1,
      //       weight: 0.17,
      //       word: "rupee",
      //     },
      //     {
      //       frequency: 1,
      //       weight: 0.17,
      //       word: "regard",
      //     },
      //   ],
      //   language: {
      //     code: "en",
      //     confidence: 1,
      //     name: "English",
      //   },
      //   pos: {
      //     ADJ: [
      //       "circular",
      //       "big",
      //       "prime",
      //       "international",
      //       "collective",
      //       "same",
      //       "prime",
      //       "monthly",
      //       "high",
      //       "less",
      //       "cognizant",
      //       "industrial",
      //       "latest",
      //       "big",
      //       "able",
      //     ],
      //     ADP: [
      //       "with",
      //       "down",
      //       "of",
      //       "at",
      //       "down",
      //       "to",
      //       "in",
      //       "by",
      //       "per",
      //       "under",
      //       "from",
      //       "in",
      //       "in",
      //       "to",
      //       "between",
      //       "of",
      //       "due",
      //       "to",
      //       "in",
      //       "of",
      //       "on",
      //       "of",
      //       "for",
      //       "for",
      //       "of",
      //       "to",
      //       "of",
      //       "to",
      //       "in",
      //     ],
      //     ADV: [
      //       "also",
      //       "fortnightly",
      //       "Moreover",
      //       "also",
      //       "also",
      //       "fully",
      //       "further",
      //     ],
      //     AUX: ["was", "were", "was", "were", "were", "were", "was", "were"],
      //     CCONJ: ["and", "and", "and", "and", "and", "or", "and", "and"],
      //     DET: [
      //       "the",
      //       "the",
      //       "a",
      //       "The",
      //       "the",
      //       "the",
      //       "the",
      //       "the",
      //       "the",
      //       "the",
      //       "the",
      //       "The",
      //       "the",
      //       "the",
      //       "the",
      //       "the",
      //       "the",
      //       "these",
      //       "the",
      //       "the",
      //       "the",
      //       "the",
      //       "the",
      //       "the",
      //       "the",
      //       "a",
      //       "this",
      //     ],
      //     NOUN: [
      //       "negotiations",
      //       "banks",
      //       "debt",
      //       "issue",
      //       "achievement",
      //       "minister",
      //       "prices",
      //       "petroleum",
      //       "prices",
      //       "market",
      //       "advantage",
      //       "relief",
      //       "power",
      //       "consumers",
      //       "petroleum",
      //       "products",
      //       "price",
      //       "adjustments",
      //       "decision",
      //       "rebasing",
      //       "issues",
      //       "unit",
      //       "price",
      //       "rate",
      //       "minister",
      //       "fee",
      //       "power",
      //       "consumers",
      //       "bills",
      //       "challenges",
      //       "power",
      //       "sector",
      //       "power",
      //       "theft",
      //       "Rs500",
      //       "difference",
      //       "production",
      //       "consumption",
      //       "electricity",
      //       "solarization",
      //       "country",
      //       "challenges",
      //       "ways",
      //       "country",
      //       "path",
      //       "progress",
      //       "power",
      //       "tariff",
      //       "household",
      //       "consumers",
      //       "ceremony",
      //       "use",
      //       "technology",
      //       "transparency",
      //       "relief",
      //       "consumers",
      //       "issue",
      //       "billions",
      //       "rupees",
      //       "consumers",
      //       "regard",
      //     ],
      //     NUM: ["two", "billion"],
      //     PART: ["to", "to", "to", "to", "to", "to", "to"],
      //     PRON: [
      //       "they",
      //       "which",
      //       "he",
      //       "they",
      //       "its",
      //       "their",
      //       "He",
      //       "He",
      //       "they",
      //       "they",
      //       "He",
      //       "they",
      //     ],
      //     PROPN: [
      //       "PTV",
      //       "Minister",
      //       "Energy",
      //       "Power",
      //       "Division",
      //       "Sardar",
      //       "Awais",
      //       "Ahmed",
      //       "Khan",
      //       "Leghari",
      //     ],
      //     PUNCT: [
      //       ",",
      //       ".",
      //       ",",
      //       ".",
      //       ",",
      //       ".",
      //       ".",
      //       ",",
      //       ".",
      //       ",",
      //       ".",
      //       ",",
      //       ",",
      //       ".",
      //       ".",
      //     ],
      //     SCONJ: ["While", "that", "when", "that", "besides", "upon"],
      //     SPACE: ["\n\n"],
      //     VERB: [
      //       "held",
      //       "settle",
      //       "added",
      //       "said",
      //       "sliding",
      //       "took",
      //       "provided",
      //       "taken",
      //       "address",
      //       "capping",
      //       "announced",
      //       "end",
      //       "charged",
      //       "identified",
      //       "including",
      //       "amounting",
      //       "said",
      //       "exploring",
      //       "take",
      //       "ensuring",
      //       "reduce",
      //       "addressing",
      //       "said",
      //       "depending",
      //       "ensure",
      //       "provide",
      //       "said",
      //       "overbilling",
      //       "reimburse",
      //       "charged",
      //     ],
      //   },
      //   readability: {
      //     avgSentenceLength: 27.75,
      //     avgSyllablesPerWord: 1.6981981981981982,
      //     complexWords: 61,
      //     fleschScore: 35,
      //     grade: 15,
      //     level: "Difficult",
      //     syllableCount: 377,
      //   },
      //   readingTime: 1,
      //   sentiment: {
      //     confidence: 0.91,
      //     label: "Positive",
      //     scores: {
      //       negative: 0.03,
      //       neutral: 0.89,
      //       positive: 0.09,
      //     },
      //   },
      //   summary:
      //     "The prime minister said that when the prices of petroleum prices at the international market were sliding down, they took its advantage. He also announced to end PTV fee charged from the power consumers in their monthly bills. Minister for Energy Power Division Sardar Awais Ahmed Khan Leghari, addressing the ceremony, said they were depending upon the use of latest technology to ensure transparency.",
      //   tone: [
      //     {
      //       strength: "Weak",
      //       tone: "Formal",
      //     },
      //     {
      //       strength: "Strong",
      //       tone: "Analytical",
      //     },
      //   ],
      //   writingStyle: {
      //     avgWordsPerSentence: 28,
      //     sentenceVariety: {
      //       long: 7,
      //       medium: 1,
      //       short: 0,
      //     },
      //     style: "Concise",
      //     vocabularyDiversity: 59,
      //     wordComplexity: {
      //       complex: 20,
      //       simple: 80,
      //     },
      //   },
      // };
      // setAnalysis(data);
      // setIsAnalyzing(false);

      fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Analysis Result:", data);
          setAnalysis(data);
        })
        .catch((err) => {
          console.error("API Error:", err);
        })
        .finally(() => {
          setIsAnalyzing(false);
        });
    }, 500);

    return () => clearTimeout(timer);
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode");
  };

  const exportAnalysis = () => {
    if (!analysis) return;

    const exportData = {
      text,
      analysis,
      timestamp: new Date().toISOString(),
      metadata: {
        version: "1.0.0",
        exportedBy: "AI NLP Text Editor",
      },
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `text-analysis-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`app ${isDarkMode ? "dark" : ""}`}>
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <Brain className="logo-icon" />
            <h1>Wordley</h1>
            <span className="logo-subtitle">AI-Powered Text Intelligence</span>
          </div>
          <div className="header-actions">
            <button
              className="btn-icon feedback-btn"
              onClick={() =>
                window.open(
                  "https://docs.google.com/forms/d/e/1FAIpQLSdBYxYQR42xv4Ur7EGSzM84i6WOu2tB2ElpBFdRL1oIVqYzoA/viewform?usp=sharing&ouid=109998621225105791030",
                  "_blank"
                )
              }
              title="Submit Feedback"
            >
              <FileWarning size={20} />
              <span>Feedback</span>
            </button>

            <button
              className="btn-icon export-btn"
              onClick={exportAnalysis}
              disabled={!analysis}
              title="Export Analysis Results"
            >
              <Download size={20} />
              <span>Export</span>
            </button>
            <button
              className="btn-icon theme-toggle"
              onClick={toggleDarkMode}
              title={`Switch to ${isDarkMode ? "Light" : "Dark"} Mode`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="editor-container">
          <div className="panel editor-panel">
            <div className="panel-header">
              <div className="panel-title">
                <FileText size={20} />
                <h2>Text Editor</h2>
              </div>
              <div className="panel-stats">
                <div className="stat-item">
                  <span className="stat-value">
                    {text.split(/\s+/).filter((word) => word.length > 0).length}
                  </span>
                  <span className="stat-label">words</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{text.length}</span>
                  <span className="stat-label">chars</span>
                </div>
              </div>
            </div>
            <TextEditor
              text={text}
              setText={setText}
              startAnalyzing={startAnalyzing}
              isDarkMode={isDarkMode}
            />
          </div>

          <div className="panel analysis-panel">
            <div className="panel-header">
              <div className="panel-title">
                <Brain size={20} />
                <h2>AI Analysis</h2>
              </div>
              <div className="analysis-status">
                {isAnalyzing && (
                  <div className="analyzing-indicator">
                    <Zap size={16} />
                    <span>Analyzing...</span>
                  </div>
                )}
                {analysis && !isAnalyzing && (
                  <div className="analysis-complete">
                    <span className="analysis-count">
                      15+ analyses complete
                    </span>
                  </div>
                )}
              </div>
            </div>
            <AnalysisPanel
              analysis={analysis}
              isAnalyzing={isAnalyzing}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <p>
            Powered by Advanced NLP Algorithms • Real-time Text Intelligence
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
