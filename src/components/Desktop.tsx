import React, { useState, useEffect } from 'react';
import { MacWindow } from './MacWindow';
import { GlassFilter } from './GlassFilter';
import { Dock } from './Dock';
import { getApplication } from './AppLauncher';
import './Desktop.css';

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
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [showAppleMenu, setShowAppleMenu] = useState(false);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulate battery drain
  useEffect(() => {
    const batteryTimer = setInterval(() => {
      setBatteryLevel(prev => {
        if (prev <= 15) return 100; // Reset when low
        return prev - 1;
      });
    }, 30000); // Every 30 seconds

    return () => clearInterval(batteryTimer);
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

  const getBatteryColor = (level: number) => {
    if (level <= 15) return '#ff0000'; // Red for critical
    if (level <= 30) return '#ff9900'; // Orange for low
    if (level <= 60) return '#ffff00'; // Yellow for fair
    return '#00ff00'; // Green for high battery
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
    <div className="desktop">
      <GlassFilter />

      {/* Menu Bar */}
      <div className="menubar">
        <div className="menu-section apple-menu-section" onClick={handleAppleMenuClick}>
          <span className="apple-logo">🍎</span>
          <span>Liquid Glass Lab</span>
        </div>
        <div className="menu-section">File</div>
        <div className="menu-section">Edit</div>
        <div className="menu-section">View</div>
        <div className="menu-section">Window</div>
        <div className="menu-section">Help</div>

        {/* Status Bar */}
        <div className="status-bar">
          <div className="status-item wifi">
            <span className="status-icon">📶</span>
            <span className="status-text">Wi-Fi</span>
          </div>
          <div className="status-item battery">
            <span className="status-icon battery-icon" style={{
              color: getBatteryColor(batteryLevel),
              filter: `drop-shadow(0 0 2px ${getBatteryColor(batteryLevel)})`
            }}>🔋</span>
            <span className="status-text">{batteryLevel}%</span>
          </div>
          <div className="status-item datetime">
            <span className="status-text">{getCurrentDateTime()}</span>
          </div>
        </div>

        {/* Apple Menu Dropdown */}
        {showAppleMenu && (
          <div className="apple-menu-dropdown apple-menu-dropdown--visible">
            {menuItems.map((item, index) => {
              if (item.separator) {
                return <div key={`separator-${index}`} className="menu-separator" />;
              }
              return (
                <div
                  key={item.action}
                  className="menu-item"
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
            <React.Suspense fallback={<div className="loading">Loading...</div>}>
              {renderWindowContent(window.appId)}
            </React.Suspense>
          </MacWindow>
        );
      })}

      {/* Dock */}
      <div className="dock-container">
        <Dock onDockItemClick={openApplication} />
      </div>
    </div>
  );
};