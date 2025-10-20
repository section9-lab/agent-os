import React, { useState, useRef, useEffect } from 'react';
import './MacWindow.css';

interface MacWindowProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMaximized: boolean;
}

export const MacWindow: React.FC<MacWindowProps> = ({
  title,
  children,
  isOpen,
  onClose,
  onMinimize,
  onMaximize,
  isMaximized
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 50 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMaximized) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, isMaximized]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('window-title')) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={windowRef}
      className={`mac-window ${isMaximized ? 'maximized' : ''}`}
      style={{
        left: isMaximized ? 0 : `${position.x}px`,
        top: isMaximized ? 0 : `${position.y}px`
      }}
    >
      <div className="window-titlebar" onMouseDown={handleMouseDown}>
        <div className="window-controls">
          <button
            className="window-control close"
            onClick={onClose}
            title="Close"
          />
          <button
            className="window-control minimize"
            onClick={onMinimize}
            title="Minimize"
          />
          <button
            className={`window-control maximize ${isMaximized ? 'restore' : ''}`}
            onClick={onMaximize}
            title={isMaximized ? "Restore" : "Maximize"}
          />
        </div>
        <div className="window-title">{title}</div>
        <div className="window-spacer" />
      </div>
      <div className="window-content">
        {children}
      </div>
    </div>
  );
};