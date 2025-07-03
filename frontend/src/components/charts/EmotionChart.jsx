import React from "react";
import "../../styles/Charts.css";

const EmotionChart = ({ data }) => {
  const emotions = data.slice(0, 6);

  const getEmotionColor = (emotion) => {
    const colors = {
      joy: "#10b981",
      neutral: "#8b5cf6",
      sadness: "#3b82f6",
      disgust: "#006400",
      fear: "#f59e0b",
      surprise: "#FF69B4",
      anger: "#ef4444",
    };
    return colors[emotion.toLowerCase()] || colors.default;
  };

  const getEmotionIcon = (emotion) => {
    const icons = {
      joy: "😊",
      sadness: "😢",
      disgust: "🤢",
      fear: "😨",
      neutral: "😐",
      surprise: "😲",
      anger: "😡",
    };
    return icons[emotion.toLowerCase()] || "😐";
  };

  const maxConfidence = Math.max(...emotions.map((e) => e.confidence));
  const scaleFactor = maxConfidence > 0 ? 1 / maxConfidence : 1;

  return (
    <div className="chart-container">
      <div className="emotion-summary">
        <div className="metric-header">Emotional Tone</div>
        <div className="dominant-emotion">
          <span className="metric-value">
            <strong>
              {emotions[0]?.emotion.charAt(0).toUpperCase() +
                emotions[0]?.emotion.slice(1)}
            </strong>
          </span>
        </div>
        {emotions.length > 1 && (
          <div className="metric-detail">
            Secondary emotions:{" "}
            {emotions
              .slice(1, 3)
              .map((e) => e.emotion)
              .join(", ")}
          </div>
        )}
      </div>
      <div className="emotion-chart">
        <div className="emotion-wheel">
          <svg width="200" height="200" className="wheel-svg">
            {emotions.map((emotion, index) => {
              const angle = (index * 360) / emotions.length;
              const radius = 70;
              const innerRadius = 30;
              const confidence = emotion.confidence * scaleFactor;
              const outerRadius =
                innerRadius + (radius - innerRadius) * confidence;

              const startAngle =
                (angle - 180 / emotions.length) * (Math.PI / 180);
              const endAngle =
                (angle + 180 / emotions.length) * (Math.PI / 180);

              const x1 = 100 + innerRadius * Math.cos(startAngle);
              const y1 = 100 + innerRadius * Math.sin(startAngle);
              const x2 = 100 + outerRadius * Math.cos(startAngle);
              const y2 = 100 + outerRadius * Math.sin(startAngle);
              const x3 = 100 + outerRadius * Math.cos(endAngle);
              const y3 = 100 + outerRadius * Math.sin(endAngle);
              const x4 = 100 + innerRadius * Math.cos(endAngle);
              const y4 = 100 + innerRadius * Math.sin(endAngle);

              const pathData = `M ${x1} ${y1} L ${x2} ${y2} A ${outerRadius} ${outerRadius} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${innerRadius} ${innerRadius} 0 0 0 ${x1} ${y1}`;

              return (
                <path
                  key={emotion.emotion}
                  d={pathData}
                  fill={getEmotionColor(emotion.emotion)}
                  opacity={0.8}
                  className="emotion-segment"
                />
              );
            })}
            <circle
              cx="100"
              cy="100"
              r="25"
              fill="#f9fafb"
              stroke="#e5e7eb"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="emotion-list">
          <h3>Emotion Analysis</h3>
          {emotions.map((emotion) => (
            <div key={emotion.emotion} className="emotion-item">
              <div className="emotion-header">
                <span className="emotion-icon">
                  {getEmotionIcon(emotion.emotion)}
                </span>
                <span className="emotion-name">
                  {emotion.emotion.charAt(0).toUpperCase() +
                    emotion.emotion.slice(1)}
                </span>
                <span className="emotion-percentage">
                  {(emotion.confidence * 100).toFixed(1)}%
                </span>
              </div>
              <div className="emotion-bar">
                <div
                  className="emotion-fill"
                  style={{
                    width: `${emotion.confidence * 100}%`,
                    backgroundColor: getEmotionColor(emotion.emotion),
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmotionChart;
