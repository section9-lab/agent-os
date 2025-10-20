import React from 'react';
import { LiquidGlass } from './LiquidGlass';
import finderIcon from '../assets/icons/finder.png';
import bookIcon from '../assets/icons/books.png';
import safariIcon from '../assets/icons/safari.png';
import messagesIcon from '../assets/icons/messages.png';
import notesIcon from '../assets/icons/notes.png';
import mapIcon from '../assets/icons/map.png';

interface DockProps {
  onDockItemClick: (appId: string) => void;
}

export const Dock: React.FC<DockProps> = ({ onDockItemClick }) => {
  const dockItems = [
    { name: 'Finder', src: finderIcon, appId: 'finder' },
    { name: 'Safari', src: safariIcon, appId: 'safari' },
    { name: 'Messages', src: messagesIcon, appId: 'messages' },
    { name: 'Notes', src: notesIcon, appId: 'notes' },
    { name: 'Maps', src: mapIcon, appId: 'maps' },
    { name: 'Books', src: bookIcon, appId: 'books' },
  ];

  const handleItemClick = (item: any) => {
    onDockItemClick(item.appId);
  };

  return (
    <LiquidGlass type="dock">
      <div className="dock">
        {dockItems.map((item, index) => (
          <img
            key={index}
            src={item.src}
            alt={item.name}
            title={item.name}
            onClick={() => handleItemClick(item)}
            className="dock-item"
          />
        ))}
      </div>
    </LiquidGlass>
  );
};