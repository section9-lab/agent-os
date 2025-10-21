import React, { useState, useEffect } from 'react';
import { MacWindow } from './MacWindow';
import { GlassFilter } from './GlassFilter';
import { Dock } from './Dock';
import { getApplication } from './AppLauncher';
import wifiIcon from '/public/wifi.svg';
import batteryIcon from '/public/battery.svg';
import appleIcon from '/public/apple.svg';


interface OpenWindow {
  id: string;
  appId: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export const Desktop: React.FC = () => {
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showAppleMenu, setShowAppleMenu] = useState(false);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Close Apple menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showAppleMenu && !target.closest('.apple-menu-section') && !target.closest('.apple-menu-dropdown')) {
        setShowAppleMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showAppleMenu]);

  // Wi-Fi always connected - no status changes needed
  const handleAppleMenuClick = () => {
    setShowAppleMenu(!showAppleMenu);
  };

  const handleMenuItemClick = (action: string) => {
    console.log(`Menu action: ${action}`);
    setShowAppleMenu(false);
    // Here you can implement the actual functionality for each menu item
  };

  const menuItems = [
    { label: '关于本机', action: 'about' },
    { label: '系统设置...', action: 'settings' },
    { label: 'App Store...', action: 'appstore' },
    { separator: true },
    { label: '最近使用的项目', action: 'recent' },
    { label: '强制退出...', action: 'force-quit' },
    { separator: true },
    { label: '睡眠', action: 'sleep' },
    { label: '重新启动...', action: 'restart' },
    { label: '关机...', action: 'shutdown' },
    { separator: true },
    { label: '锁定屏幕', action: 'lock-screen' },
    { label: '推出登录...', action: 'logout' }
  ];

  const getCurrentDateTime = () => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: false
    };
    return currentTime.toLocaleDateString('en-US', options);
  };

  const openApplication = (appId: string) => {
    const app = getApplication(appId);
    if (!app) return;

    const existingWindow = openWindows.find(w => w.appId === appId);

    if (existingWindow) {
      // If window exists and is minimized, restore it
      if (existingWindow.isMinimized) {
        setOpenWindows(prev => prev.map(w =>
          w.id === existingWindow.id
            ? { ...w, isMinimized: false }
            : w
        ));
        setActiveWindowId(existingWindow.id);
      }
      // If window exists, bring it to front
      setActiveWindowId(existingWindow.id);
    } else {
      // Create new window
      const newWindow: OpenWindow = {
        id: `window-${Date.now()}`,
        appId,
        title: app.name,
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
        position: { x: 100 + openWindows.length * 30, y: 50 + openWindows.length * 30 },
        size: {
          width: app.initialWidth || 600,
          height: app.initialHeight || 400
        }
      };

      setOpenWindows(prev => [...prev, newWindow]);
      setActiveWindowId(newWindow.id);
    }
  };

  const closeWindow = (windowId: string) => {
    setOpenWindows(prev => prev.filter(w => w.id !== windowId));
    if (activeWindowId === windowId) {
      setActiveWindowId(null);
    }
  };

  const minimizeWindow = (windowId: string) => {
    setOpenWindows(prev => prev.map(w =>
      w.id === windowId ? { ...w, isMinimized: true } : w
    ));
  };

  const maximizeWindow = (windowId: string) => {
    setOpenWindows(prev => prev.map(w =>
      w.id === windowId ? { ...w, isMaximized: !w.isMaximized } : w
    ));
  };

  const renderWindowContent = (appId: string) => {
    const app = getApplication(appId);
    if (!app) return null;

    const Component = app.component;
    return <Component />;
  };

  return (
    <div className="fixed inset-0 bg-cover bg-center bg-no-repeat bg-[url('/background.jpg')] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-black/15 pointer-events-none z-[1]" />
      <GlassFilter />

      {/* Menu Bar */}
      <div className="fixed top-0 left-0 right-0 h-7 bg-black/30 backdrop-blur-glass border-b border-white/10 flex items-center px-3 gap-5 text-xs text-white z-[1000]">
        <img src={appleIcon} alt="apple" className="w-4 h-4" onClick={handleAppleMenuClick}/>
        <div className="cursor-pointer px-2 py-1 rounded transition-colors duration-200 hover:bg-white/20 select-none" >
          <span>Agent-OS</span>
        </div>
        <div className="cursor-pointer px-2 py-1 rounded transition-colors duration-200 hover:bg-white/20">File</div>
        <div className="cursor-pointer px-2 py-1 rounded transition-colors duration-200 hover:bg-white/20">Edit</div>
        <div className="cursor-pointer px-2 py-1 rounded transition-colors duration-200 hover:bg-white/20">View</div>
        <div className="cursor-pointer px-2 py-1 rounded transition-colors duration-200 hover:bg-white/20">Window</div>
        <div className="cursor-pointer px-2 py-1 rounded transition-colors duration-200 hover:bg-white/20">Help</div>

        {/* Status Bar */}
        <div className="flex items-center gap-3 ml-auto text-xs text-white">
          <div className="flex items-center gap-1 px-2 py-1 rounded transition-colors duration-200 cursor-pointer hover:bg-white/10">
            <span className="text-sm drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
              <img src={wifiIcon} alt="WiFi" className="w-6 h-6" />
            </span>

          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded transition-colors duration-200 cursor-pointer hover:bg-white/10">
            <img src={batteryIcon} alt="Battery" className="w-6 h-6" />
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded transition-colors duration-200 cursor-pointer hover:bg-white/10">
            <span className="font-medium">{getCurrentDateTime()}</span>
          </div>
        </div>

        {/* Apple Menu Dropdown */}
        {showAppleMenu && (
          <div className="absolute top-7 left-2 bg-white/60 backdrop-blur-glass saturate-180 border border-black/8 rounded-md shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.12),0_8px_32px_rgba(0,0,0,0.08)] min-w-[162px] py-[0.25px] z-[1001] text-[#1d1d1f] text-[13px] font-light leading-none transform -translate-y-2 opacity-0 transition-all duration-[0.18s] ease-[cubic-bezier(0.2,0,0,1)] pointer-events-none"
              style={{ transform: 'translateY(0)', opacity: 1, pointerEvents: 'auto' }}>
            {menuItems.map((item, index) => {
              if (item.separator) {
                return <div key={`separator-${index}`} className="h-px bg-black/8 mx-3 my-[6px] relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/8 to-transparent"></div>
                      </div>;
              }
              return (
                <div
                  key={item.action}
                  className="px-3 py-0.5 text-xs cursor-pointer transition-colors duration-[0.15s] ease-out font-normal flex items-center min-h-[19px] relative whitespace-nowrap select-none hover:bg-[rgba(0,122,255,0.12)] hover:text-black active:bg-[rgba(0,122,255,0.25)] active:text-black active:transition-colors active:duration-[0.08s] active:ease-out"
                  data-action={item.action}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMenuItemClick(item.action || '');
                  }}
                >
                  {item.label}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Open Windows */}
      {openWindows.map((window) => {
        const app = getApplication(window.appId);
        if (!app) return null;

        return (
          <MacWindow
            key={window.id}
            title={window.title}
            isOpen={window.isOpen && !window.isMinimized}
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
            onMaximize={() => maximizeWindow(window.id)}
            isMaximized={window.isMaximized}
          >
            <React.Suspense fallback={<div className="flex items-center justify-center h-full text-sm text-gray-500">Loading...</div>}>
              {renderWindowContent(window.appId)}
            </React.Suspense>
          </MacWindow>
        );
      })}

      {/* Dock */}
      <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-[998]">
        <Dock onDockItemClick={openApplication} />
      </div>
    </div>
  );
};