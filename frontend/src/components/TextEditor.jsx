import React from "react";
import "../styles/TextEditor.css";
import { BrainCircuit } from "lucide-react";

const TextEditor = ({ text, setText, startAnalyzing, isDarkMode }) => {
  const MAX_WORDS = 300;

  const countWords = (str) => str.trim().split(/\s+/).filter(Boolean).length;

  const wordCount = countWords(text);

  const handleChange = (e) => {
    const inputText = e.target.value;
    const words = inputText.trim().split(/\s+/).filter(Boolean);

    // Auto prune to 350 words
    if (words.length <= MAX_WORDS) {
      setText(inputText);
    } else {
      const pruned = words.slice(0, MAX_WORDS).join(" ");
      setText(pruned);
    }
  };

  const placeholder = `Start typing your text here...

  You can paste any content - articles, essays, stories, reports, or any text you'd like to analyze. The AI will provide comprehensive analysis including:

  • Sentiment and emotional analysis
  • Keywords and entity recognition  
  • Writing style and readability metrics
  • Grammar and coherence evaluation
  • Summary and classification

  Max 300 words!`;

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
          disabled={wordCount === 0}
          style={{
            opacity: wordCount === 0 ? 0.6 : 1,
            cursor: wordCount === 0 ? "not-allowed" : "pointer",
          }}
        >
          <BrainCircuit size={20} />
          <span>Analyze</span>
        </button>
      </div>
    </div>
  );
};

export default TextEditor;
