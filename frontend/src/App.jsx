import { useState } from "react";
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
      fetch(`${window.origin}/analyze`, {
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
