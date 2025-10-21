import React, { useState, useRef, useEffect } from 'react';

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
      className={`fixed bg-white/95 backdrop-blur-glass rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.2)] overflow-hidden z-[1000] min-w-[400px] min-h-[300px] w-[800px] h-[600px] ${isMaximized ? 'rounded-none w-screen h-screen' : ''}`}
      style={{
        left: isMaximized ? 0 : `${position.x}px`,
        top: isMaximized ? 0 : `${position.y}px`,
        transition: 'none'
      }}
    >
      <div className="h-9 bg-gradient-to-b from-white/80 to-white/60 border-b border-black/10 flex items-center px-3 cursor-move select-none" onMouseDown={handleMouseDown}>
        <div className="flex gap-2 items-center">
          <button
            className="w-3 h-3 rounded-full border-none cursor-pointer transition-transform duration-200 hover:scale-110 relative bg-mac-red hover:bg-mac-red-hover"
            onClick={onClose}
            title="Close"
          />
          <button
            className="w-3 h-3 rounded-full border-none cursor-pointer transition-transform duration-200 hover:scale-110 relative bg-mac-yellow hover:bg-mac-yellow-hover"
            onClick={onMinimize}
            title="Minimize"
          />
          <button
            className={`w-3 h-3 rounded-full border-none cursor-pointer transition-transform duration-200 hover:scale-110 relative bg-mac-green hover:bg-mac-green-hover ${isMaximized ? 'restore' : ''}`}
            onClick={onMaximize}
            title={isMaximized ? "Restore" : "Maximize"}
          />
        </div>
        <div className="flex-1 text-center text-sm font-medium text-gray-700 pointer-events-none">{title}</div>
        <div className="w-[52px]" />
      </div>
      <div className="h-[calc(100%-36px)] overflow-auto bg-[rgba(248,248,248,0.8)]">
        {children}
      </div>
    </div>
  );
};