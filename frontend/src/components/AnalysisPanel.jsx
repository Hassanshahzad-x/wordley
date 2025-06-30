import React, { useState } from "react";
import {
  TrendingUp,
  Heart,
  Key,
  Clock,
  BookOpen,
  Globe,
  User,
  BarChart3,
  Target,
  CheckCircle,
  Tag,
  Zap,
  Brain,
  TextQuote,
  Grab,
  GraduationCap,
} from "lucide-react";
import SentimentChart from "./charts/SentimentChart";
import ReadabilityChart from "./charts/ReadabilityChart";
import EmotionChart from "./charts/EmotionChart";
import "../styles/AnalysisPanel.css";

const AnalysisPanel = ({ analysis, isAnalyzing, isDarkMode }) => {
  const [activeTab, setActiveTab] = useState("overview");

  if (isAnalyzing) {
    return (
      <div className="analysis-loading">
        <div className="loading-spinner"></div>
        <p>Analyzing text with AI...</p>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="analysis-empty">
        <Brain size={48} />
        <h3>Ready for Analysis</h3>
        <p>
          Start typing in the editor to see comprehensive AI-powered text
          analysis
        </p>
        <div className="features-grid">
          <div className="feature-item">
            <TrendingUp size={20} />
            <span>Sentiment Analysis</span>
          </div>
          <div className="feature-item">
            <Heart size={20} />
            <span>Emotion Detection</span>
          </div>
          <div className="feature-item">
            <Key size={20} />
            <span>Keyword Extraction</span>
          </div>
          <div className="feature-item">
            <BookOpen size={20} />
            <span>Readability Analysis</span>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "sentiment", label: "Sentiment", icon: TrendingUp },
    { id: "emotions", label: "Emotions", icon: Heart },
    { id: "entities", label: "Entities", icon: User },
    { id: "keywords", label: "Keywords", icon: Key },
    { id: "readability", label: "Readability", icon: BookOpen },
    { id: "advanced", label: "Advanced", icon: Zap },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="tab-content">
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-header">
                  <TrendingUp size={20} />
                  <span>Overall Sentiment</span>
                </div>
                <div className="metric-value">{analysis.sentiment.label}</div>
                <div className="metric-detail">
                  Confidence: {(analysis.sentiment.confidence * 100).toFixed(1)}
                  %
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-header">
                  <Clock size={20} />
                  <span>Reading Time</span>
                </div>
                <div className="metric-value">
                  {analysis.readingTime} min(s)
                </div>
                <div className="metric-detail">
                  {analysis.basicStats.words} words
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-header">
                  <BookOpen size={20} />
                  <span>Reading Level</span>
                </div>
                <div className="metric-value">{analysis.readability.level}</div>
                <div className="metric-detail">
                  Grade {analysis.readability.grade}
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-header">
                  <Globe size={20} />
                  <span>Language</span>
                </div>
                <div className="metric-value">{analysis.language.name}</div>
                <div className="metric-detail">
                  Confidence: {(analysis.language.confidence * 100).toFixed(1)}%
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-header">
                  <TextQuote size={20} />
                  <span>Text Category</span>
                </div>
                <div className="metric-value">
                  {analysis.classification.category}
                </div>
                <div className="metric-detail">
                  Confidence: {(analysis.language.confidence * 100).toFixed(1)}%
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-header">
                  <GraduationCap size={20} />
                  <span>Grammar Score</span>
                </div>
                <div className="metric-value">{analysis.grammar.score}</div>
                <div className="metric-detail">
                  Issues: {analysis.grammar.issues}
                </div>
              </div>
            </div>

            <div className="quick-insights">
            <GraduationCap size={16} />
              <span>Summary</span>
              <div className="insights-list">
                <div className="metric-detail">{analysis.summary}</div>
              </div>
            </div>
          </div>
        );

      case "sentiment":
        return (
          <div className="tab-content">
            <SentimentChart data={analysis.sentiment} />
            <div className="sentiment-details">
              <h3>Sentiment Breakdown</h3>
              <div className="sentiment-scores">
                {["positive", "neutral", "negative"].map((type) => (
                  <div key={type} className={`score-item ${type}`}>
                    <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                    <div className="score-bar">
                      <div
                        className={`score-fill ${type}`}
                        style={{
                          width: `${analysis.sentiment.scores[type] * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span>
                      {(analysis.sentiment.scores[type] * 100).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "emotions":
        return (
          <div className="tab-content">
            <EmotionChart data={analysis.emotions} />
            <div className="emotions-list">
              <h3>Detected Emotions</h3>
              {analysis.emotions.map((emotion, index) => (
                <div key={index} className="emotion-item">
                  <span className="emotion-name">{emotion.emotion}</span>
                  <div className="emotion-bar">
                    <div
                      className="emotion-fill"
                      style={{
                        width: `${emotion.confidence * 100}%`,
                        backgroundColor: getEmotionColor(emotion.emotion),
                      }}
                    ></div>
                  </div>
                  <span className="emotion-score">
                    {(emotion.confidence * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case "entities":
        return (
          <div className="tab-content">
            <div className="entities-section">
              <h3>Named Entities</h3>
              <div className="entities-grid">
                {Object.entries(analysis.entities).map(
                  ([type, entities]) =>
                    entities.length > 0 && (
                      <div key={type} className="entity-group">
                        <h4>{type.toUpperCase()}</h4>
                        <div className="entity-tags">
                          {entities.map((entity, index) => (
                            <span key={index} className="entity-tag">
                              {entity}
                            </span>
                          ))}
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        );

      case "keywords":
        return (
          <div className="tab-content">
            <div className="keywords-section">
              <h3>Key Terms & Phrases</h3>
              <div className="keywords-list">
                {analysis.keywords.map((keyword, index) => (
                  <div key={index} className="keyword-item">
                    <span className="keyword-text">{keyword.word}</span>
                    <div className="keyword-stats">
                      <span className="keyword-freq">×{keyword.frequency}</span>
                      <span className="keyword-weight">
                        {keyword.weight.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "readability":
        return (
          <div className="tab-content">
            <ReadabilityChart data={analysis.readability} />
            <div className="readability-metrics">
              <div className="metric-row">
                <span>Flesch Reading Ease:</span>
                <span className="metric-value">
                  {analysis.readability.fleschScore.toFixed(1)}
                </span>
              </div>
              <div className="metric-row">
                <span>Average Sentence Length:</span>
                <span className="metric-value">
                  {analysis.readability.avgSentenceLength.toFixed(1)} words
                </span>
              </div>
              <div className="metric-row">
                <span>Complex Words:</span>
                <span className="metric-value">
                  {analysis.readability.complexWords}%
                </span>
              </div>
            </div>
          </div>
        );

      case "advanced":
        return (
          <div className="tab-content">
            <div className="advanced-metrics">
              <div className="metric-section">
                <h3>Text Classification</h3>
                <div className="classification-result">
                  <span className="category">
                    {analysis.classification.category}
                  </span>
                  <span className="confidence">
                    {(analysis.classification.confidence * 100).toFixed(1)}%
                    confidence
                  </span>
                </div>
              </div>

              <div className="metric-section">
                <h3>Coherence Analysis</h3>
                <div className="coherence-score">
                  <span className="score">
                    {analysis.coherence.score.toFixed(2)}
                  </span>
                  <span className="label">Coherence Score</span>
                </div>
                <p className="coherence-description">
                  {analysis.coherence.description}
                </p>
              </div>

              <div className="metric-section">
                <h3>Grammar Analysis</h3>
                <div className="grammar-results">
                  <div className="grammar-score">
                    Score: {analysis.grammar.score}%
                  </div>
                  {analysis.grammar.issues.length > 0 && (
                    <div className="grammar-issues">
                      <h4>Potential Issues:</h4>
                      <ul>
                        {analysis.grammar.issues.map((issue, index) => (
                          <li key={index}>{issue}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="analysis-results">
      <div className="tabs-header">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <IconComponent size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
      <div className="tab-content-container">{renderTabContent()}</div>
    </div>
  );
};

const getEmotionColor = (emotion) => {
  const colors = {
    joy: "#10b981",
    sadness: "#3b82f6",
    anger: "#ef4444",
    fear: "#8b5cf6",
    surprise: "#f59e0b",
    disgust: "#84cc16",
  };
  return colors[emotion] || "#6b7280";
};

export default AnalysisPanel;
