import React, { useEffect, useMemo, useState } from 'react';
import { MacWindow } from './MacWindow';
import { GlassFilter } from './GlassFilter';
import { Dock } from './Dock';
import { getApplication } from './AppLauncher';

const wifiIcon = '/wifi.svg';
const batteryIcon = '/battery.svg';
const appleIcon = '/apple.svg';

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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

  const handleAppleMenuClick = () => {
    setShowAppleMenu(!showAppleMenu);
  };

  const handleMenuItemClick = (action: string) => {
    console.log(`Menu action: ${action}`);
    setShowAppleMenu(false);
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
    { label: '推出登录...', action: 'logout' },
  ];

  const getCurrentDateTime = () => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: false,
    };
    return currentTime.toLocaleDateString('en-US', options);
  };

  const bringToFront = (windowId: string) => {
    setActiveWindowId(windowId);
  };

  const openApplication = (appId: string) => {
    const app = getApplication(appId);
    if (!app) return;

    const existingWindow = openWindows.find(window => window.appId === appId);

    if (existingWindow) {
      setOpenWindows(prev =>
        prev.map(window =>
          window.id === existingWindow.id ? { ...window, isMinimized: false } : window,
        ),
      );
      setActiveWindowId(existingWindow.id);
      return;
    }

    const newWindow: OpenWindow = {
      id: `window-${Date.now()}`,
      appId,
      title: app.name,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      position: { x: 100 + openWindows.length * 30, y: 60 + openWindows.length * 30 },
      size: {
        width: app.initialWidth || 600,
        height: app.initialHeight || 400,
      },
    };

    setOpenWindows(prev => [...prev, newWindow]);
    setActiveWindowId(newWindow.id);
  };

  const closeWindow = (windowId: string) => {
    const visibleWindows = openWindows.filter(window => window.id !== windowId && !window.isMinimized);
    setOpenWindows(prev => prev.filter(window => window.id !== windowId));
    setActiveWindowId(visibleWindows.length ? visibleWindows[visibleWindows.length - 1].id : null);
  };

  const minimizeWindow = (windowId: string) => {
    const remainingVisibleWindows = openWindows.filter(window => window.id !== windowId && !window.isMinimized);
    setOpenWindows(prev => prev.map(window => (window.id === windowId ? { ...window, isMinimized: true } : window)));
    if (activeWindowId === windowId) {
      setActiveWindowId(remainingVisibleWindows.length ? remainingVisibleWindows[remainingVisibleWindows.length - 1].id : null);
    }
  };

  const maximizeWindow = (windowId: string) => {
    setOpenWindows(prev =>
      prev.map(window =>
        window.id === windowId ? { ...window, isMaximized: !window.isMaximized } : window,
      ),
    );
    setActiveWindowId(windowId);
  };

  const moveWindow = (windowId: string, position: { x: number; y: number }) => {
    setOpenWindows(prev => prev.map(window => (window.id === windowId ? { ...window, position } : window)));
  };

  const renderWindowContent = (appId: string) => {
    const app = getApplication(appId);
    if (!app) return null;

    const Component = app.component;
    return <Component />;
  };

  const visibleWindows = useMemo(
    () => openWindows.filter(window => window.isOpen && !window.isMinimized),
    [openWindows],
  );

  const orderedWindows = useMemo(() => {
    if (!activeWindowId) return visibleWindows;

    const inactiveWindows = visibleWindows.filter(window => window.id !== activeWindowId);
    const activeWindow = visibleWindows.find(window => window.id === activeWindowId);
    return activeWindow ? [...inactiveWindows, activeWindow] : visibleWindows;
  }, [activeWindowId, visibleWindows]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-[url('/background.svg')] bg-cover bg-center bg-no-repeat">
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/10 via-black/5 to-black/15" />
      <GlassFilter />

      <div className="fixed left-0 right-0 top-0 z-[1000] flex h-7 items-center gap-5 border-b border-white/10 bg-black/30 px-3 text-xs text-white backdrop-blur-glass">
        <img src={appleIcon} alt="apple" className="apple-menu-section h-4 w-4 cursor-pointer" onClick={handleAppleMenuClick} />
        <div className="cursor-pointer select-none rounded px-2 py-1 transition-colors duration-200 hover:bg-white/20">
          <span>Agent-OS</span>
        </div>
        <div className="cursor-pointer rounded px-2 py-1 transition-colors duration-200 hover:bg-white/20">File</div>
        <div className="cursor-pointer rounded px-2 py-1 transition-colors duration-200 hover:bg-white/20">Edit</div>
        <div className="cursor-pointer rounded px-2 py-1 transition-colors duration-200 hover:bg-white/20">View</div>
        <div className="cursor-pointer rounded px-2 py-1 transition-colors duration-200 hover:bg-white/20">Window</div>
        <div className="cursor-pointer rounded px-2 py-1 transition-colors duration-200 hover:bg-white/20">Help</div>

        <div className="ml-auto flex items-center gap-3 text-xs text-white">
          <div className="flex cursor-pointer items-center gap-1 rounded px-2 py-1 transition-colors duration-200 hover:bg-white/10">
            <img src={wifiIcon} alt="WiFi" className="h-6 w-6" />
          </div>
          <div className="flex cursor-pointer items-center gap-1 rounded px-2 py-1 transition-colors duration-200 hover:bg-white/10">
            <img src={batteryIcon} alt="Battery" className="h-6 w-6" />
          </div>
          <div className="flex cursor-pointer items-center gap-1 rounded px-2 py-1 transition-colors duration-200 hover:bg-white/10">
            <span className="font-medium">{getCurrentDateTime()}</span>
          </div>
        </div>

        {showAppleMenu && (
          <div
            className="apple-menu-dropdown absolute left-2 top-7 z-[1001] min-w-[162px] rounded-md border border-black/8 bg-white/60 py-[0.25px] text-[13px] font-light leading-none text-[#1d1d1f] opacity-100 shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.12),0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-glass saturate-180 transition-all duration-[0.18s] ease-[cubic-bezier(0.2,0,0,1)]"
            style={{ transform: 'translateY(0)', pointerEvents: 'auto' }}
          >
            {menuItems.map((item, index) => {
              if (item.separator) {
                return (
                  <div key={`separator-${index}`} className="relative mx-3 my-[6px] h-px bg-black/8">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/8 to-transparent" />
                  </div>
                );
              }
              return (
                <div
                  key={item.action}
                  className="relative flex min-h-[19px] cursor-pointer select-none items-center whitespace-nowrap px-3 py-0.5 text-xs font-normal transition-colors duration-[0.15s] ease-out hover:bg-[rgba(0,122,255,0.12)] hover:text-black active:bg-[rgba(0,122,255,0.25)] active:text-black active:duration-[0.08s]"
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

      {orderedWindows.map((window, index) => {
        const app = getApplication(window.appId);
        if (!app) return null;

        return (
          <MacWindow
            key={window.id}
            title={window.title}
            isOpen={window.isOpen && !window.isMinimized}
            isMaximized={window.isMaximized}
            position={window.position}
            size={window.size}
            zIndex={100 + index}
            onFocus={() => bringToFront(window.id)}
            onMove={(position) => moveWindow(window.id, position)}
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
            onMaximize={() => maximizeWindow(window.id)}
          >
            <React.Suspense fallback={<div className="flex h-full items-center justify-center text-sm text-gray-500">Loading...</div>}>
              {renderWindowContent(window.appId)}
            </React.Suspense>
          </MacWindow>
        );
      })}

      <div className="fixed bottom-5 left-1/2 z-[998] -translate-x-1/2 transform">
        <Dock onDockItemClick={openApplication} />
      </div>
    </div>
  );
};
