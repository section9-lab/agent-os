import React, { useEffect, useState } from 'react';

interface MacWindowProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onMove: (position: { x: number; y: number }) => void;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

export const MacWindow: React.FC<MacWindowProps> = ({
  title,
  children,
  isOpen,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
  isMaximized,
  position,
  size,
  zIndex,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || isMaximized) return;

      const nextPosition = {
        x: Math.max(0, e.clientX - dragStart.x),
        y: Math.max(28, e.clientY - dragStart.y),
      };

      onMove(nextPosition);
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
  }, [dragStart, isDragging, isMaximized, onMove]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMaximized) return;

    const target = e.target as HTMLElement;
    const isTitleBar = target === e.currentTarget || target.closest('[data-window-drag-handle="true"]');

    if (!isTitleBar) return;

    onFocus();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed overflow-hidden bg-white/95 shadow-[0_8px_32px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.2)] backdrop-blur-glass ${isMaximized ? 'rounded-none' : 'rounded-xl'}`}
      style={{
        left: isMaximized ? 0 : position.x,
        top: isMaximized ? 28 : position.y,
        width: isMaximized ? '100vw' : size.width,
        height: isMaximized ? 'calc(100vh - 28px)' : size.height,
        zIndex,
      }}
      onMouseDown={onFocus}
    >
      <div
        className="flex h-9 cursor-move select-none items-center border-b border-black/10 bg-gradient-to-b from-white/80 to-white/60 px-3"
        onMouseDown={handleMouseDown}
        data-window-drag-handle="true"
      >
        <div className="flex items-center gap-2">
          <button
            className="relative h-3 w-3 rounded-full border-none bg-mac-red transition-transform duration-200 hover:scale-110 hover:bg-mac-red-hover"
            onClick={onClose}
            title="Close"
          />
          <button
            className="relative h-3 w-3 rounded-full border-none bg-mac-yellow transition-transform duration-200 hover:scale-110 hover:bg-mac-yellow-hover"
            onClick={onMinimize}
            title="Minimize"
          />
          <button
            className="relative h-3 w-3 rounded-full border-none bg-mac-green transition-transform duration-200 hover:scale-110 hover:bg-mac-green-hover"
            onClick={onMaximize}
            title={isMaximized ? 'Restore' : 'Maximize'}
          />
        </div>
        <div className="pointer-events-none flex-1 text-center text-sm font-medium text-gray-700">{title}</div>
        <div className="w-[52px]" />
      </div>
      <div className="h-[calc(100%-36px)] overflow-auto bg-[rgba(248,248,248,0.8)]">{children}</div>
    </div>
  );
};
