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
  Brain,
  Pen,
  Text,
  SearchCode,
  HelpCircle,
  Cable,
  Orbit,
  Scan,
  WholeWord,
  Languages,
  LucideWholeWord,
  Link2Icon,
  Repeat,
  DiffIcon,
  FileDiff,
  LucideNavigation,
  Component,
  TextCursor,
  BookMarked,
  Speech,
} from "lucide-react";
import SentimentChart from "./charts/SentimentChart";
import EmotionChart from "./charts/EmotionChart";
import "../styles/AnalysisPanel.css";

const AnalysisPanel = ({ analysis, isAnalyzing, isDarkMode }) => {
  const [activeTab, setActiveTab] = useState("overview");

  if (isAnalyzing) {
    return (
      <div className="analysis-loading">
        <div className="loading-spinner"></div>
        <p>Analyzing your text with AI, this might take few minutes...</p>
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
    { id: "pos", label: "Parts of Speech", icon: Speech },
    { id: "classification", label: "Classification", icon: SearchCode },
    { id: "keywords", label: "Keywords", icon: Key },
    { id: "readability", label: "Style & Readability", icon: BookOpen },
    { id: "summary", label: "Summary", icon: Text },
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
                  <span>Characters</span>
                </div>
                <div className="metric-value">
                  {analysis.basicStats.charactersNoSpaces}
                </div>
                <div className="metric-detail">
                  With spaces: {analysis.basicStats.characters}
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-header">
                  <Cable size={20} />
                  <span>Paragraphs</span>
                </div>
                <div className="metric-value">
                  {analysis.basicStats.paragraphs}
                </div>
                <div className="metric-detail">
                  Average Sentences per Paragraph:{" "}
                  {analysis.basicStats.avgSentencesPerParagraph}
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-header">
                  <Link2Icon size={20} />
                  <span>Sentences</span>
                </div>
                <div className="metric-value">
                  {analysis.basicStats.sentences}
                </div>
                <div className="metric-detail">
                  Average Words per Sentence:{" "}
                  {analysis.basicStats.avgWordsPerSentence}
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-header">
                  <WholeWord size={20} />
                  <span>Words</span>
                </div>
                <div className="metric-value">{analysis.basicStats.words}</div>
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
                  <Languages size={20} />
                  <span>Language</span>
                </div>
                <div className="metric-value">{analysis.language.name}</div>
                <div className="metric-detail">
                  Confidence: {(analysis.language.confidence * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          </div>
        );

      case "sentiment":
        return (
          <div className="tab-content">
            <SentimentChart data={analysis.sentiment} />
            <div className="sentiment-details">
              <h3
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                Tone
              </h3>
              <div className="metrics-grid">
                {analysis.tone.map((entry) => {
                  return (
                    <div className="metric-card">
                      <div className="metric-value">{entry.tone}</div>
                      <div className="metric-detail">
                        Strength: {entry.strength}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case "emotions":
        return (
          <div className="tab-content">
            <EmotionChart data={analysis.emotions} />
          </div>
        );

      case "entities":
        return (
          <div className="tab-content">
            <div className="entities-section">
              <h3
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                Named Entities
                <span className="tooltip-wrapper">
                  <HelpCircle size={18} color="blue" className="help-icon" />
                  <span className="tooltip-text">
                    Named Entities are specific people, organizations, places,
                    or things mentioned in the text.
                  </span>
                </span>
              </h3>

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

      case "pos":
        return (
          <div className="tab-content">
            <div className="entities-section">
              <h3
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                Parts of Speech
                <span className="tooltip-wrapper">
                  <HelpCircle size={18} color="blue" className="help-icon" />
                  <span className="tooltip-text">
                    Parts of Speech (POS) highlight the grammatical roles of
                    words like nouns, verbs, adjectives, etc., as detected in
                    the text.
                  </span>
                </span>
              </h3>

              <div className="entities-grid">
                {Object.entries(analysis.pos).map(
                  ([pos, words]) =>
                    words.length > 0 && (
                      <div key={pos} className="entity-group">
                        <h4>{POS_FULL_FORMS[pos] || pos}</h4>
                        <div className="entity-tags">
                          {words.map((word, idx) => (
                            <span
                              key={idx}
                              className={`entity-tag ${posColors[pos] || ""}`}
                            >
                              {word}
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
              <h3
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                Key Terms & Phrases
                <span className="tooltip-wrapper">
                  <HelpCircle size={18} color="blue" className="help-icon" />
                  <span className="tooltip-text">
                    Important words or phrases that summarize the key topics or
                    themes in the text. Good keyword usage improves SEO,
                    clarity, and relevance.
                  </span>
                </span>
              </h3>
              <div className="keywords-list">
                {analysis.keywords
                  .sort((a, b) => b.frequency - a.frequency)
                  .map((keyword, index) => (
                    <div key={index} className="keyword-item">
                      <span className="keyword-text">{keyword.word}</span>
                      <div className="keyword-stats">
                        <span className="keyword-freq">
                          ×{keyword.frequency}
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
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-header">
                  <Repeat size={20} />
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    Flesch Reading Ease
                    <span className="tooltip-wrapper">
                      <HelpCircle
                        size={18}
                        color="blue"
                        className="help-icon"
                      />
                      <span className="tooltip-text">
                        A readability score <b>(0–100)</b> based on sentence
                        length and syllable count.
                        <br />
                        <br />
                        <b>Ideal Scores:</b>
                        <li>
                          60–70 (easily understood by 13 - to 15-year-olds)
                        </li>
                        <li>80–100 (very easy to read)</li>
                        <li>
                          30–50 (difficult but okay for academic or technical
                          writing)
                        </li>
                        <li>Below 30 (very hard to read)</li>
                      </span>
                    </span>
                  </span>
                </div>
                <div className="metric-value">
                  {analysis.readability.fleschScore.toFixed(1)}
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-header">
                  <FileDiff size={20} />
                  <span>Difficulty</span>
                </div>
                <div className="metric-value">{analysis.readability.level}</div>
                <div className="metric-detail">
                  Grade: {analysis.readability.grade}
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-header">
                  <LucideNavigation size={20} />
                  <span>Average Sentence Length</span>
                </div>
                <div className="metric-value">
                  {analysis.readability.avgSentenceLength.toFixed(1)} words
                </div>
                <div className="metric-detail">
                  Syllable count: {analysis.readability.syllableCount}
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-header">
                  <Component size={20} />
                  <span>Complex Words</span>
                </div>
                <div className="metric-value">
                  {analysis.readability.complexWords} words
                </div>
              </div>
            </div>
            <div className="advanced-metrics">
              <div className="metric-section">
                <h3>Writing Style</h3>
                <div className="coherence-score">
                  <span className="score">{analysis.writingStyle.style}</span>
                </div>
                <p className="coherence-description">
                  Text Complexity: <strong>{analysis.complexity.level}</strong>
                </p>
              </div>

              <div className="metric-section">
                <h3>Complexity Factors</h3>
                {Object.entries(analysis.complexity.factors).map(
                  ([factor, score]) => (
                    <div key={factor} className="emotion-item">
                      <div className="emotion-header">
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          <span className="emotion-name">
                            {factor.charAt(0).toUpperCase() + factor.slice(1)}
                          </span>
                          <span className="tooltip-wrapper">
                            <HelpCircle
                              size={18}
                              color="blue"
                              className="help-icon"
                            />
                            <span className="tooltip-text">
                              {getSemanticDescription(factor)}
                            </span>
                          </span>
                        </span>
                        <span className="emotion-percentage">{score}%</span>
                      </div>
                      <div className="emotion-bar">
                        <div
                          className="emotion-fill"
                          style={{
                            width: `${score}%`,
                            backgroundColor: getfactorsColor(factor),
                          }}
                        ></div>
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className="metric-section">
                <h3>Sentence Variety</h3>
                {Object.entries(analysis.writingStyle.sentenceVariety).map(
                  ([factor, score]) => (
                    <div key={factor} className="emotion-item">
                      <div className="emotion-header">
                        <span className="emotion-name">
                          {factor.charAt(0).toUpperCase() + factor.slice(1)}
                        </span>
                        <span className="emotion-percentage">{score}</span>
                      </div>
                      <div className="emotion-bar">
                        <div
                          className="emotion-fill"
                          style={{
                            width: `${score}%`,
                            backgroundColor: "blue",
                          }}
                        ></div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        );

      case "classification":
        return (
          <div className="tab-content">
            <div className="advanced-metrics">
              <div className="metric-section">
                <h3>Text Classification</h3>
                <div className="entities-section">
                  <div className="entities-grid">
                    <div className="entity-group">
                      <h4>Primary</h4>
                      <div className="entity-tags">
                        <span className="entity-tag">
                          {analysis.classification.category}
                        </span>
                      </div>
                    </div>

                    <div className="entity-group">
                      <h4>Secondary</h4>
                      <div className="entity-tags">
                        {Object.entries(analysis.classification.scores)
                          .filter(
                            ([label]) =>
                              label.toLowerCase() !==
                              analysis.classification.category.toLowerCase()
                          )
                          .map(([label]) => (
                            <span className="entity-tag">
                              {label.charAt(0).toUpperCase() + label.slice(1)}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="metric-section">
                <h3
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  Coherence Analysis
                  <span className="tooltip-wrapper">
                    <HelpCircle size={18} color="blue" className="help-icon" />
                    <span className="tooltip-text">
                      Coherence measures how logically connected and
                      easy-to-follow the text is. It looks at how well sentences
                      flow together and if the message builds smoothly.
                      <br />
                      <br />
                      <strong>70 – 100</strong> is considered good. <br />
                      Below <strong>50</strong> suggests poor transitions or
                      disconnected ideas.
                    </span>
                  </span>
                </h3>
                <div className="coherence-score">
                  <span className="score">
                    {(analysis.coherence.score * 100).toFixed(0)}
                  </span>
                  <span className="label">Coherence Score</span>
                </div>
                <p className="coherence-description">
                  {analysis.coherence.description}
                </p>
              </div>

              {/* <div className="metric-section">
                <h3>Grammar Analysis</h3>
                <div className="grammar-results">
                  <div className="coherence-score">
                    <span
                      className="score"
                      style={{
                        color: "green",
                      }}
                    >
                      {analysis.grammar.score}
                    </span>
                    <span className="label">Grammar Score</span>
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
              </div> */}
            </div>
          </div>
        );

      case "summary":
        return (
          <div className="tab-content">
            <div className="metric-card">
              <div className="metric-header">
                <BookMarked size={20} />
                <span>Summary</span>
              </div>
              <div className="metric-detail">{analysis.summary}</div>
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

const getfactorsColor = (factor) => {
  const colors = {
    lexical: "#10b981",
    semantic: "#3b82f6",
    syntactic: "#ef4444",
  };
  return colors[factor] || "#6b7280";
};

const getSemanticDescription = (factor) => {
  const descriptions = {
    lexical: (
      <>
        Refers to the vocabulary difficulty — how rare, sophisticated, or varied
        the words are.
        <br />
        <br />
        <ul style={{ paddingLeft: "1.2rem" }}>
          <li>20 – 50: balanced vocabulary</li>
          <li>&gt; 60: advanced or technical (may hurt readability)</li>
          <li>&lt; 20: too basic or repetitive</li>
        </ul>
      </>
    ),
    semantic: (
      <>
        Measures how conceptually dense or abstract the ideas are.
        <br />
        <br />
        <ul style={{ paddingLeft: "1.2rem" }}>
          <li>30 – 60: good for general communication</li>
          <li>&gt; 60: more nuanced/abstract (okay for experts)</li>
          <li>&lt; 30: simple and direct</li>
        </ul>
      </>
    ),
    syntactic: (
      <>
        Refers to the complexity of sentence structures — use of clauses,
        conjunctions, and length.
        <br />
        <br />
        <ul style={{ paddingLeft: "1.2rem" }}>
          <li>30 – 60: clear and rich sentence construction</li>
          <li>&gt; 70: may become hard to follow</li>
          <li>&lt; 30: may sound choppy or oversimplified</li>
        </ul>
      </>
    ),
  };

  return descriptions[factor] || null;
};

const POS_FULL_FORMS = {
  ADJ: "Adjective",
  ADP: "Adposition",
  ADV: "Adverb",
  AUX: "Auxiliary Verb",
  CCONJ: "Coordinating Conjunction",
  DET: "Determiner",
  INTJ: "Interjection",
  NOUN: "Noun",
  NUM: "Numeral",
  PART: "Particle",
  PRON: "Pronoun",
  PROPN: "Proper Noun",
  PUNCT: "Punctuation",
  SCONJ: "Subordinating Conjunction",
  SPACE: "Space",
  VERB: "Verb",
  X: "Other",
  SYM: "SYMBOL"
};

const posColors = {
  NOUN: "tag-noun",
  VERB: "tag-verb",
  ADJ: "tag-adj",
  ADV: "tag-adv",
  PRON: "tag-pron",
  PROPN: "tag-propn",
  ADP: "tag-adp",
  CCONJ: "tag-cconj",
  SCONJ: "tag-sconj",
  AUX: "tag-aux",
  PART: "tag-part",
  NUM: "tag-num",
  DET: "tag-det",
  PUNCT: "tag-punct",
  SPACE: "tag-space",
  INTJ: "tag-intj",
  X: "tag-x",
};

export default AnalysisPanel;
