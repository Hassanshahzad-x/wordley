import React from "react";
import "../../styles/Charts.css";

const ReadabilityChart = ({ data }) => {
  const { fleschScore, level, grade, avgSentenceLength, complexWords } = data;

  const scorePercentage = Math.max(0, Math.min(100, fleschScore));

  const getScoreColor = (score) => {
    if (score >= 80) return "#10b981";
    if (score >= 60) return "#f59e0b";
    if (score >= 30) return "#f97316";
    return "#ef4444";
  };

  const scoreColor = getScoreColor(scorePercentage);

  return (
    <div className="chart-container">
      <h3>Readability Analysis</h3>
      <div className="readability-chart">
        <div className="readability-circle">
          <div className="circle-container">
            <svg width="120" height="120" className="circle-svg">
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke={scoreColor}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${scorePercentage * 3.14} 314`}
                transform="rotate(-90 60 60)"
                className="score-circle"
              />
            </svg>
            <div className="circle-content">
              <div className="score-value">{Math.round(scorePercentage)}</div>
              <div className="score-label">Score</div>
            </div>
          </div>
          <div className="readability-level">
            <span className="level-text">{level}</span>
            <span className="grade-text">Grade {grade}</span>
          </div>
        </div>

        <div className="readability-metrics">
          <div className="metric-item">
            <div className="metric-label">Avg Sentence Length</div>
            <div className="metric-bar">
              <div
                className="metric-fill"
                style={{
                  width: `${Math.min(avgSentenceLength * 4, 100)}%`,
                  backgroundColor:
                    avgSentenceLength > 20
                      ? "#ef4444"
                      : avgSentenceLength > 15
                      ? "#f59e0b"
                      : "#10b981",
                }}
              ></div>
            </div>
            <div className="metric-value">
              {Math.round(avgSentenceLength)} words
            </div>
          </div>

          <div className="metric-item">
            <div className="metric-label">Complex Words</div>
            <div className="metric-bar">
              <div
                className="metric-fill"
                style={{
                  width: `${complexWords}%`,
                  backgroundColor:
                    complexWords > 30
                      ? "#ef4444"
                      : complexWords > 15
                      ? "#f59e0b"
                      : "#10b981",
                }}
              ></div>
            </div>
            <div className="metric-value">{complexWords}%</div>
          </div>
        </div>
      </div>

      <div className="readability-scale">
        <div className="scale-title">Readability Scale</div>
        <div className="scale-bar">
          <div className="scale-segment very-easy" style={{ width: "15%" }}>
            <span>Very Easy</span>
            <small>90-100</small>
          </div>
          <div className="scale-segment easy" style={{ width: "15%" }}>
            <span>Easy</span>
            <small>80-90</small>
          </div>
          <div className="scale-segment fairly-easy" style={{ width: "15%" }}>
            <span>Fairly Easy</span>
            <small>70-80</small>
          </div>
          <div className="scale-segment standard" style={{ width: "15%" }}>
            <span>Standard</span>
            <small>60-70</small>
          </div>
          <div
            className="scale-segment fairly-difficult"
            style={{ width: "15%" }}
          >
            <span>Fairly Difficult</span>
            <small>50-60</small>
          </div>
          <div className="scale-segment difficult" style={{ width: "15%" }}>
            <span>Difficult</span>
            <small>30-50</small>
          </div>
          <div
            className="scale-segment very-difficult"
            style={{ width: "10%" }}
          >
            <span>Very Difficult</span>
            <small>0-30</small>
          </div>
        </div>
        <div
          className="current-position"
          style={{ left: `${scorePercentage}%` }}
        >
          <div className="position-marker"></div>
        </div>
      </div>
    </div>
  );
};

export default ReadabilityChart;
