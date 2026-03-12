import React from 'react';
import { LiquidGlass } from './LiquidGlass';
import { getAllApplications, type Application } from './AppLauncher';

interface DockProps {
  onDockItemClick: (appId: string) => void;
}

export const Dock: React.FC<DockProps> = ({ onDockItemClick }) => {
  const dockItems = getAllApplications();

  const handleItemClick = (item: Application) => {
    onDockItemClick(item.id);
  };

  return (
    <LiquidGlass type="dock">
      <div className="flex items-end gap-6">
        {dockItems.map((item) => (
          <img
            key={item.id}
            src={item.icon}
            alt={item.name}
            title={item.name}
            onClick={() => handleItemClick(item)}
            className="h-[68px] w-[68px] cursor-pointer object-contain p-0 transition-all duration-[0.4s] ease-mac-window hover:scale-110 hover:origin-center"
          />
        ))}
      </div>
    </LiquidGlass>
  );
};
