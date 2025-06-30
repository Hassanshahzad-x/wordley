import React, { useState, useEffect } from 'react';
import { Moon, Sun, Download, FileText, Brain, Zap } from 'lucide-react';
import TextEditor from './components/TextEditor';
import AnalysisPanel from './components/AnalysisPanel';
import { analyzeText } from './utils/nlpAnalyzer';
import './styles/App.css';

function App() {
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (!text.trim()) {
      setAnalysis(null);
      return;
    }

    setIsAnalyzing(true);
    const timer = setTimeout(() => {
      const data = {
        basicStats: {
          avgSentencesPerParagraph: 3.25,
          avgWordsPerSentence: 20.23,
          characters: 1804,
          charactersNoSpaces: 1545,
          paragraphs: 4,
          sentences: 13,
          words: 263,
        },
        bias: {
          bias: [
            {
              confidence: 0.06,
              label: "empathetic",
            },
            {
              confidence: 0.05,
              label: "balanced",
            },
            {
              confidence: 0.05,
              label: "opinionated",
            },
          ],
        },
        classification: {
            category: "Technological",
            confidence: 0.05,
            scores: {
              educational: 0.04,
              reflective: 0.04,
              technological: 0.05,
            },
        },
        coherence: {
            description: "Moderate coherence with acceptable flow",
            score: 0.49,
            transitionCount: 4,
          },
        complexity: {
          factors: {
            lexical: 69,
            semantic: 46,
            syntactic: 80,
          },
          level: "Medium",
          score: 65,
        },
          emotions: [
            {
              confidence: 0.99,
              emotion: "joy",
            },
            {
              confidence: 0,
              emotion: "anger",
            },
            {
              confidence: 0,
              emotion: "sadness",
            },
            {
              confidence: 0,
              emotion: "fear",
            },
            {
              confidence: 0,
              emotion: "love",
            },
            {
              confidence: 0,
              emotion: "surprise",
            },
          ],
        entities: {
          CARDINAL: ["two"],
          DATE: ["daily", "recent years"],
          GPE: ["AI"],
          ORG: ["AI"],
        },
        grammar: {
            issues: ["Possible spelling mistake found."],
            score: 98,
        },
        keywords: [
          {
            frequency: 1,
            weight: 0.17,
            word: "year",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "advancement",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "intelligence",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "way",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "technology",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "recommendation",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "engine",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "entertainment",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "choice",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "assistant",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "schedule",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "life",
          },
          {
            frequency: 2,
            weight: 0.33,
            word: "future",
          },
          {
            frequency: 6,
            weight: 1,
            word: "ai",
          },
          {
            frequency: 2,
            weight: 0.33,
            word: "machine",
          },
          {
            frequency: 3,
            weight: 0.5,
            word: "human",
          },
          {
            frequency: 2,
            weight: 0.33,
            word: "collaboration",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "era",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "productivity",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "creativity",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "precision",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "scalability",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "algorithm",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "empathy",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "intuition",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "reasoning",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "being",
          },
          {
            frequency: 2,
            weight: 0.33,
            word: "challenge",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "healthcare",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "example",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "dataset",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "pattern",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "disease",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "progression",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "doctor",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "judgment",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "finding",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "care",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "education",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "adaptive",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "learning",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "platform",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "content",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "student",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "teacher",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "encouragement",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "development",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "concern",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "bias",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "transparency",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "accountability",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "system",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "aitechnologie",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "fairness",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "inclusivity",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "mind",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "reinforcement",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "inequality",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "governance",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "framework",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "cooperation",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "role",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "question",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "power",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "capability",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "journey",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "culture",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "innovation",
          },
          {
            frequency: 1,
            weight: 0.17,
            word: "dialogue",
          },
        ],
        language: {
            code: "en",
            confidence: 1,
            name: "English",
          },
        readability: {
          avgSentenceLength: 20.23076923076923,
          avgSyllablesPerWord: 1.9695817490494296,
          complexWords: 111,
          fleschScore: 19.67,
          grade: 16,
          level: "Very Difficult",
          syllableCount: 518,
        },
        readingTime: 1,
        sentiment: {
            confidence: 0.99,
            label: "Positive",
            scores: {
              negative: 0.03,
              neutral: 0.77,
              positive: 0.21,
            },
          },
        summary:
            "Future of AI will not be defined solely by machines replacing humans, but by intelligent collaboration between humans and machines . Human--AI collaboration promises a new era of productivity and creativity . Ethical concerns about bias, transparency, and accountability in AI systems are growing. It is essential to ensure that AItechnologies are designed with fairness and inclusivity in mind, avoiding the reinforcement of historical inequalities .",
        tone: {
          tone: [
            {
              strength: "Strong",
              tone: "Formal",
            },
            {
              strength: "Strong",
              tone: "Analytical",
            },
          ],
        },
        writingStyle: {
          writingStyle: {
            avgWordsPerSentence: 20,
            sentenceVariety: {
              long: 8,
              medium: 4,
              short: 1,
            },
            style: "Elaborate Formal",
            vocabularyDiversity: 67,
            wordComplexity: {
              complex: 26,
              simple: 74,
            },
          },
        },
      };
      setAnalysis(data)
      setIsAnalyzing(false);
      // fetch("http://127.0.0.1:5000/analyze", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ text: text }),
      // })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     console.log("Analysis Result:", data);
      //     setAnalysis(data);
      //   })
      //   .catch((err) => {
      //     console.error("API Error:", err);
      //   })
      //   .finally(() => {
      //     setIsAnalyzing(false);
      //   });
    }, 500);

    return () => clearTimeout(timer);
  }, [text]);
  

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
  };

  const exportAnalysis = () => {
    if (!analysis) return;
    
    const exportData = {
      text,
      analysis,
      timestamp: new Date().toISOString(),
      metadata: {
        version: '1.0.0',
        exportedBy: 'AI NLP Text Editor'
      }
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `text-analysis-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`app ${isDarkMode ? 'dark' : ''}`}>
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <Brain className="logo-icon" />
            <h1>Wordley</h1>
            <span className="logo-subtitle">AI-Powered Text Intelligence</span>
          </div>
          <div className="header-actions">
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
              title={`Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode`}
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
                    {text.split(/\s+/).filter(word => word.length > 0).length}
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
          <p>Powered by Advanced NLP Algorithms • Real-time Text Intelligence</p>
        </div>
      </footer>
    </div>
  );
}

export default App;