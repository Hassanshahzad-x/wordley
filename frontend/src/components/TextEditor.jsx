import React from "react";
import "../styles/TextEditor.css";
import { Brain, Stamp, Download, MagnetIcon, BrainCircuit } from "lucide-react";

const TextEditor = ({ text, setText, startAnalyzing, isDarkMode }) => {
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
        className={`editor-textarea ${isDarkMode ? "dark" : ""}`}
        spellCheck="false"
      />

      <div className="editor-stats">
        <button
          className="btn-icon"
          onClick={startAnalyzing}
        >
          <BrainCircuit size={20} />
          <span>Analyze</span>
        </button>
      </div>
    </div>
  );
};

export default TextEditor;
