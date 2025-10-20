import React, { useState } from 'react';
import './FileExplorer.css';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  icon: string;
  size?: string;
  modified?: string;
}

export const FileExplorer: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('/Users/liquid-glass-lab');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const files: FileItem[] = [
    { id: '1', name: 'Documents', type: 'folder', icon: '📁' },
    { id: '2', name: 'Downloads', type: 'folder', icon: '📁' },
    { id: '3', name: 'Desktop', type: 'folder', icon: '📁' },
    { id: '4', name: 'Applications', type: 'folder', icon: '📁' },
    { id: '5', name: 'README.md', type: 'file', icon: '📄', size: '12.5 KB', modified: '2025-01-21' },
    { id: '6', name: 'package.json', type: 'file', icon: '📄', size: '2.1 KB', modified: '2025-01-21' },
    { id: '7', name: 'src', type: 'folder', icon: '📁' },
    { id: '8', name: 'index.html', type: 'file', icon: '🌐', size: '1.8 KB', modified: '2025-01-21' },
  ];

  const handleItemClick = (item: FileItem) => {
    if (item.type === 'folder') {
      setCurrentPath(`${currentPath}/${item.name}`);
      setSelectedItem(null);
    } else {
      setSelectedItem(item.id);
    }
  };

  const handleGoBack = () => {
    const parts = currentPath.split('/');
    parts.pop();
    setCurrentPath(parts.join('/') || '/');
  };

  return (
    <div className="file-explorer">
      <div className="explorer-toolbar">
        <button onClick={handleGoBack} className="toolbar-btn">← Back</button>
        <div className="path-bar">{currentPath}</div>
        <button className="toolbar-btn">Search</button>
      </div>

      <div className="explorer-content">
        <div className="sidebar">
          <div className="sidebar-item active">🏠 Home</div>
          <div className="sidebar-item">💾 Documents</div>
          <div className="sidebar-item">📥 Downloads</div>
          <div className="sidebar-item">🖥️ Desktop</div>
          <div className="sidebar-item">⚙️ Settings</div>
        </div>

        <div className="file-list">
          <div className="file-header">
            <div>Name</div>
            <div>Size</div>
            <div>Modified</div>
          </div>
          {files.map((file) => (
            <div
              key={file.id}
              className={`file-item ${selectedItem === file.id ? 'selected' : ''}`}
              onClick={() => handleItemClick(file)}
            >
              <div className="file-name">
                <span className="file-icon">{file.icon}</span>
                {file.name}
              </div>
              <div className="file-size">{file.size || '--'}</div>
              <div className="file-modified">{file.modified || '--'}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};