import React from 'react';

interface LiquidGlassProps {
  type: 'button' | 'menu' | 'dock';
  children: React.ReactNode;
  className?: string;
}

export const LiquidGlass: React.FC<LiquidGlassProps> = ({ type, children, className = '' }) => {
  return (
    <div className={`liquidGlass-wrapper ${type} ${className}`}>
      <div className="liquidGlass-effect"></div>
      <div className="liquidGlass-text">
        {children}
      </div>
    </div>
  );
};