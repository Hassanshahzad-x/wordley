import React from "react";
import "../../styles/Charts.css";

const SentimentChart = ({ data }) => {
  const { scores } = data;

  return (
    <div className="chart-container">
      <h3>Sentiment Distribution</h3>
      <div className="sentiment-chart">
        <div className="chart-bars">
          <div className="bar-group">
            <div className="bar-label">Positive</div>
            <div className="bar-container">
              <div
                className="bar positive"
                style={{ height: `${scores.positive * 200}px` }}
              ></div>
            </div>
            <div className="bar-value">
              {(scores.positive * 100).toFixed(1)}%
            </div>
          </div>

          <div className="bar-group">
            <div className="bar-label">Neutral</div>
            <div className="bar-container">
              <div
                className="bar neutral"
                style={{ height: `${scores.neutral * 200}px` }}
              ></div>
            </div>
            <div className="bar-value">
              {(scores.neutral * 100).toFixed(1)}%
            </div>
          </div>

          <div className="bar-group">
            <div className="bar-label">Negative</div>
            <div className="bar-container">
              <div
                className="bar negative"
                style={{ height: `${scores.negative * 200}px` }}
              ></div>
            </div>
            <div className="bar-value">
              {(scores.negative * 100).toFixed(1)}%
            </div>
          </div>
        </div>

        <div className="overall-sentiment">
          <div className="sentiment-indicator">
            <span className={`sentiment-label ${data.label.toLowerCase()}`}>
              {data.label}
            </span>
            <span className="confidence">
              {(data.confidence * 100).toFixed(1)}% confidence
            </span>
          </div>
          <div className="metric-detail">Overall sentiment not necessarily has to be the sentiment with the highest percentage.</div>
        </div>
      </div>
    </div>
  );
};

export default SentimentChart;
