import React, { useState } from 'react';
import './TextEditor.css';

export const TextEditor: React.FC = () => {
  const [content, setContent] = useState(`# Welcome to Liquid Glass Lab

This is a simple text editor built with React and styled with the beautiful liquid glass effect.

## Features
- ✨ Beautiful glass morphism design
- 🖱️ Interactive window controls
- 📱 Responsive layout
- 🎨 Smooth animations

## Getting Started
1. Click and drag the window to move it
2. Use the window controls to close, minimize, or maximize
3. Try the different applications in the dock

Happy coding! 🚀`);

  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setContent(text);
    setWordCount(text.trim() ? text.trim().split(/\s+/).length : 0);
    setCharCount(text.length);
  };

  return (
    <div className="text-editor">
      <div className="editor-toolbar">
        <div className="toolbar-section">
          <button className="toolbar-btn">File</button>
          <button className="toolbar-btn">Edit</button>
          <button className="toolbar-btn">Format</button>
          <button className="toolbar-btn">View</button>
        </div>
        <div className="toolbar-section">
          <button className="toolbar-btn">Bold</button>
          <button className="toolbar-btn">Italic</button>
          <button className="toolbar-btn">Underline</button>
        </div>
      </div>

      <div className="editor-content">
        <textarea
          value={content}
          onChange={handleContentChange}
          className="editor-textarea"
          placeholder="Start typing..."
          spellCheck={false}
        />
      </div>

      <div className="editor-status">
        <span>Words: {wordCount}</span>
        <span>Characters: {charCount}</span>
        <span>Plain Text</span>
      </div>
    </div>
  );
};