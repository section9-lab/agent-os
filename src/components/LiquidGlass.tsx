import React from 'react';

interface LiquidGlassProps {
  type: 'button' | 'menu' | 'dock';
  children: React.ReactNode;
  className?: string;
}

export const LiquidGlass: React.FC<LiquidGlassProps> = ({ type, children, className = '' }) => {
  const baseClasses = "relative flex font-semibold overflow-hidden text-black cursor-pointer shadow-[0_6px_6px_rgba(0,0,0,0.2),0_0_20px_rgba(0,0,0,0.1)] transition-all duration-[0.4s] ease-mac-window";

  const typeClasses = {
    button: "px-10 py-6 rounded-3xl",
    menu: "px-1.5 py-1.5 rounded-[1.8rem]",
    dock: "px-2.5 py-2.5 rounded-2xl"
  };

  const hoverClasses = {
    button: "hover:px-[2.25rem] hover:py-[2.25rem]",
    menu: "hover:px-2.5 hover:py-2.5",
    dock: "hover:px-4 hover:py-4"
  };

  const innerHoverClasses = {
    button: "hover:rounded-[4rem]",
    menu: "hover:rounded-[1.8rem]",
    dock: "hover:rounded-[2.5rem]"
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]} ${hoverClasses[type]} ${className}`}>
      <div className={`absolute z-0 inset-0 backdrop-blur-sm filter saturate-180 overflow-hidden isolate ${innerHoverClasses[type]}`} style={{ filter: 'url(#glass-distortion)' }}></div>
      <div className="absolute z-10 inset-0 bg-white/25"></div>
      <div className={`absolute z-20 inset-0 overflow-hidden shadow-[inset_2px_2px_1px_0_rgba(255,255,255,0.1),inset_-1px_-1px_1px_1px_rgba(255,255,255,0.3)] ${innerHoverClasses[type]}`}></div>
      <div className="relative z-30 text-2xl text-black">
        {children}
      </div>
    </div>
  );
};