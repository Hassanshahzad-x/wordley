import React from 'react';
import '../styles/TextEditor.css';

const TextEditor = ({ text, setText, isDarkMode }) => {
  const handleChange = (e) => {
    setText(e.target.value);
  };

  const placeholder = `Start typing your text here...

You can paste any content - articles, essays, stories, reports, or any text you'd like to analyze. The AI will provide comprehensive analysis including:

• Sentiment and emotional analysis
• Key topics and entity recognition  
• Writing style and readability metrics
• Grammar and coherence evaluation
• And much more...

Try pasting a news article, blog post, or any text to see the power of AI-driven text analysis!`;

  return (
    <div className="text-editor">
      <textarea
        value={text}
        onChange={handleChange}
        placeholder={placeholder}
        className={`editor-textarea ${isDarkMode ? 'dark' : ''}`}
        spellCheck="false"
      />
      
      <div className="editor-stats">
        <div className="stat">
          <span className="stat-label">Characters:</span>
          <span className="stat-value">{text.length}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Words:</span>
          <span className="stat-value">
            {text.split(/\s+/).filter(word => word.length > 0).length}
          </span>
        </div>
        <div className="stat">
          <span className="stat-label">Paragraphs:</span>
          <span className="stat-value">
            {text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;