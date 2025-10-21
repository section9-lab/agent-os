import React, { useState } from 'react';

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
    <div className="h-full flex flex-col bg-white">
      <div className="h-10 bg-gray-100 border-b border-gray-300 flex items-center px-3 gap-4">
        <div className="flex gap-2">
          <button className="px-3 py-1.5 bg-white border border-gray-400 rounded-md cursor-pointer text-sm transition-colors duration-200 hover:bg-gray-200">File</button>
          <button className="px-3 py-1.5 bg-white border border-gray-400 rounded-md cursor-pointer text-sm transition-colors duration-200 hover:bg-gray-200">Edit</button>
          <button className="px-3 py-1.5 bg-white border border-gray-400 rounded-md cursor-pointer text-sm transition-colors duration-200 hover:bg-gray-200">Format</button>
          <button className="px-3 py-1.5 bg-white border border-gray-400 rounded-md cursor-pointer text-sm transition-colors duration-200 hover:bg-gray-200">View</button>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 bg-white border border-gray-400 rounded-md cursor-pointer text-sm transition-colors duration-200 hover:bg-gray-200">Bold</button>
          <button className="px-3 py-1.5 bg-white border border-gray-400 rounded-md cursor-pointer text-sm transition-colors duration-200 hover:bg-gray-200">Italic</button>
          <button className="px-3 py-1.5 bg-white border border-gray-400 rounded-md cursor-pointer text-sm transition-colors duration-200 hover:bg-gray-200">Underline</button>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-auto">
        <textarea
          value={content}
          onChange={handleContentChange}
          className="w-full h-full border-none outline-none font-mono text-sm leading-6 resize-none bg-transparent"
          placeholder="Start typing..."
          spellCheck={false}
        />
      </div>

      <div className="h-6 bg-gray-100 border-t border-gray-300 flex items-center px-4 gap-6 text-xs text-gray-600">
        <span>Words: {wordCount}</span>
        <span>Characters: {charCount}</span>
        <span>Plain Text</span>
      </div>
    </div>
  );
};