import React from 'react';
import '../../styles/Charts.css';

const EmotionChart = ({ data }) => {
  const emotions = data.slice(0, 6);

  const getEmotionColor = (emotion) => {
    const colors = {
      joy: '#10b981',
      happiness: '#10b981',
      sadness: '#3b82f6',
      anger: '#ef4444',
      fear: '#8b5cf6',
      surprise: '#f59e0b',
      disgust: '#84cc16',
      anticipation: '#06b6d4',
      trust: '#14b8a6',
      default: '#6b7280'
    };
    return colors[emotion.toLowerCase()] || colors.default;
  };

  const getEmotionIcon = (emotion) => {
    const icons = {
      joy: '😊',
      happiness: '😊',
      sadness: '😢',
      anger: '😠',
      fear: '😨',
      surprise: '😲',
      disgust: '🤢',
      anticipation: '🤔',
      trust: '🤝'
    };
    return icons[emotion.toLowerCase()] || '😐';
  };

  const maxConfidence = Math.max(...emotions.map(e => e.confidence));
  const scaleFactor = maxConfidence > 0 ? 1 / maxConfidence : 1;

  return (
    <div className="chart-container">
      <h3>Emotion Analysis</h3>
      <div className="emotion-chart">
        <div className="emotion-wheel">
          <svg width="200" height="200" className="wheel-svg">
            {emotions.map((emotion, index) => {
              const angle = (index * 360) / emotions.length;
              const radius = 70;
              const innerRadius = 30;
              const confidence = emotion.confidence * scaleFactor;
              const outerRadius = innerRadius + (radius - innerRadius) * confidence;

              const startAngle = (angle - 180 / emotions.length) * (Math.PI / 180);
              const endAngle = (angle + 180 / emotions.length) * (Math.PI / 180);

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
            <circle cx="100" cy="100" r="25" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="2" />
            <text x="100" y="105" textAnchor="middle" className="center-text" fontSize="12" fill="#374151">
              Emotions
            </text>
          </svg>
        </div>

        <div className="emotion-list">
          {emotions.map((emotion, index) => (
            <div key={emotion.emotion} className="emotion-item">
              <div className="emotion-header">
                <span className="emotion-icon">{getEmotionIcon(emotion.emotion)}</span>
                <span className="emotion-name">
                  {emotion.emotion.charAt(0).toUpperCase() + emotion.emotion.slice(1)}
                </span>
                <span className="emotion-percentage">{(emotion.confidence * 100).toFixed(1)}%</span>
              </div>
              <div className="emotion-bar">
                <div
                  className="emotion-fill"
                  style={{
                    width: `${emotion.confidence * scaleFactor * 100}%`,
                    backgroundColor: getEmotionColor(emotion.emotion)
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="emotion-summary">
        <div className="summary-title">Emotional Tone</div>
        <div className="dominant-emotion">
          <span className="dominant-icon">{getEmotionIcon(emotions[0]?.emotion)}</span>
          <span className="dominant-text">
            Primarily <strong>{emotions[0]?.emotion}</strong> with{' '}
            <strong>{(emotions[0]?.confidence * 100).toFixed(1)}%</strong> confidence
          </span>
        </div>
        {emotions.length > 1 && (
          <div className="secondary-emotions">
            Secondary emotions: {emotions.slice(1, 3).map(e => e.emotion).join(', ')}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmotionChart;
