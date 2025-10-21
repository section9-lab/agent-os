import React, { useState } from 'react';

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
    <div className="h-full flex flex-col bg-white">
      <div className="h-10 bg-gray-100 border-b border-gray-300 flex items-center px-3 gap-3">
        <button onClick={handleGoBack} className="px-3 py-1.5 bg-white border border-gray-400 rounded-md cursor-pointer text-sm transition-colors duration-200 hover:bg-gray-200">← Back</button>
        <div className="flex-1 px-3 py-1.5 bg-white border border-gray-400 rounded-md text-sm font-mono">{currentPath}</div>
        <button className="px-3 py-1.5 bg-white border border-gray-400 rounded-md cursor-pointer text-sm transition-colors duration-200 hover:bg-gray-200">Search</button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-50 bg-gray-50 border-r border-gray-300 py-3">
          <div className="px-4 py-2 cursor-pointer text-sm transition-colors duration-200 bg-blue-500 text-white">🏠 Home</div>
          <div className="px-4 py-2 cursor-pointer text-sm transition-colors duration-200 hover:bg-gray-200">💾 Documents</div>
          <div className="px-4 py-2 cursor-pointer text-sm transition-colors duration-200 hover:bg-gray-200">📥 Downloads</div>
          <div className="px-4 py-2 cursor-pointer text-sm transition-colors duration-200 hover:bg-gray-200">🖥️ Desktop</div>
          <div className="px-4 py-2 cursor-pointer text-sm transition-colors duration-200 hover:bg-gray-200">⚙️ Settings</div>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-[1fr_100px_120px] px-4 py-2 bg-gray-100 border-b border-gray-300 text-xs font-semibold text-gray-600">
            <div>Name</div>
            <div>Size</div>
            <div>Modified</div>
          </div>
          {files.map((file) => (
            <div
              key={file.id}
              className={`grid grid-cols-[1fr_100px_120px] px-4 py-2 border-b border-gray-100 cursor-pointer text-sm transition-colors duration-200 hover:bg-gray-50 ${selectedItem === file.id ? 'bg-blue-500 text-white' : ''}`}
              onClick={() => handleItemClick(file)}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{file.icon}</span>
                {file.name}
              </div>
              <div className={`text-xs ${selectedItem === file.id ? 'text-white/80' : 'text-gray-600'}`}>{file.size || '--'}</div>
              <div className={`text-xs ${selectedItem === file.id ? 'text-white/80' : 'text-gray-600'}`}>{file.modified || '--'}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};