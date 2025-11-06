import React, { useState, useRef, useEffect } from 'react';

interface Tab {
  id: string;
  title: string;
  url: string;
  favicon?: string;
  loadError?: boolean;
}

export const Safari: React.FC = () => {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: '1', title: 'Start Page', url: 'about:blank', favicon: '🏠' }
  ]);
  const [activeTabId, setActiveTabId] = useState('1');
  const [inputUrl, setInputUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const loadTimeoutRef = useRef<NodeJS.Timeout>();

  const activeTab = tabs.find(tab => tab.id === activeTabId);

  useEffect(() => {
    if (activeTab) {
      setInputUrl(activeTab.url === 'about:blank' ? '' : activeTab.url);
      setLoadError(activeTab.loadError || false);
    }
  }, [activeTabId, activeTab]);

  useEffect(() => {
    return () => {
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
      }
    };
  }, []);

  const handleNewTab = () => {
    const newTab: Tab = {
      id: Date.now().toString(),
      title: 'New Tab',
      url: 'about:blank',
      favicon: '🏠'
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
  };

  const handleCloseTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tabs.length === 1) return;

    const newTabs = tabs.filter(tab => tab.id !== tabId);
    setTabs(newTabs);

    if (activeTabId === tabId) {
      setActiveTabId(newTabs[newTabs.length - 1].id);
    }
  };

  const handleNavigate = (url: string) => {
    if (!url) return;

    let finalUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('about:')) {
      if (url.includes('.')) {
        finalUrl = 'https://' + url;
      } else {
        finalUrl = 'https://www.google.com/search?q=' + encodeURIComponent(url);
      }
    }

    setIsLoading(true);
    setLoadError(false);
    setRetryCount(0);

    const updatedTabs = tabs.map(tab =>
      tab.id === activeTabId
        ? { ...tab, url: finalUrl, title: finalUrl, loadError: false }
        : tab
    );
    setTabs(updatedTabs);
    setInputUrl(finalUrl);

    // 设置15秒超时，检测是否加载失败
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
    }
    loadTimeoutRef.current = setTimeout(() => {
      setIsLoading(false);
      setLoadError(true);
      const errorTabs = tabs.map(tab =>
        tab.id === activeTabId
          ? { ...tab, loadError: true }
          : tab
      );
      setTabs(errorTabs);
    }, 15000);
  };

  const handleIframeLoad = () => {
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
    }

    // iframe 加载完成，直接设置加载状态为 false
    setIsLoading(false);
    setLoadError(false);
  };

  const handleIframeError = () => {
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
    }
    setIsLoading(false);
    setLoadError(true);

    const errorTabs = tabs.map(tab =>
      tab.id === activeTabId
        ? { ...tab, loadError: true }
        : tab
    );
    setTabs(errorTabs);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleNavigate(inputUrl);
    }
  };

  const handleReload = () => {
    if (activeTab && activeTab.url !== 'about:blank') {
      setIsLoading(true);
      setLoadError(false);
      setRetryCount(prev => prev + 1);

      if (iframeRef.current) {
        iframeRef.current.src = activeTab.url;
      }

      // 重置超时
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
      }
      loadTimeoutRef.current = setTimeout(() => {
        setIsLoading(false);
        setLoadError(true);
        const errorTabs = tabs.map(tab =>
          tab.id === activeTabId
            ? { ...tab, loadError: true }
            : tab
        );
        setTabs(errorTabs);
      }, 15000);
    }
  };

  const handleOpenInNewWindow = () => {
    if (activeTab && activeTab.url !== 'about:blank') {
      window.open(activeTab.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* 标签栏 */}
      <div className="h-9 bg-gradient-to-b from-gray-100 to-gray-50 border-b border-gray-200 flex items-center px-2 gap-1">
        <div className="flex-1 flex items-center gap-1 overflow-x-auto scrollbar-hide">
          {tabs.map(tab => (
            <div
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`
                group relative min-w-[140px] max-w-[200px] h-7 px-3 flex items-center gap-2
                rounded-t-md transition-all cursor-pointer
                ${activeTabId === tab.id
                  ? 'bg-white shadow-sm'
                  : 'bg-gray-200/50 hover:bg-gray-200/80'
                }
              `}
            >
              <span className="text-xs">{tab.favicon}</span>
              <span className="flex-1 text-xs truncate">
                {tab.title}
              </span>
              {tabs.length > 1 && (
                <button
                  onClick={(e) => handleCloseTab(tab.id, e)}
                  className="opacity-0 group-hover:opacity-100 w-4 h-4 flex items-center justify-center rounded hover:bg-gray-300/50 transition-opacity"
                >
                  <span className="text-[10px] text-gray-600">✕</span>
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={handleNewTab}
          className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded transition-colors"
          title="New Tab"
        >
          <span className="text-sm">+</span>
        </button>
      </div>

      {/* 工具栏 */}
      <div className="h-12 bg-white border-b border-gray-200 flex items-center px-3 gap-2">
        {/* 导航按钮 */}
        <div className="flex items-center gap-1">
          <button
            className="w-7 h-7 flex items-center justify-center rounded-full transition-colors text-gray-400 cursor-not-allowed"
            title="Back"
            disabled
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 2L3.5 6L7.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            className="w-7 h-7 flex items-center justify-center rounded-full transition-colors text-gray-400 cursor-not-allowed"
            title="Forward"
            disabled
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.5 2L8.5 6L4.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* 地址栏 */}
        <div className="flex-1 flex items-center gap-2 px-3 h-8 bg-gray-100 rounded-lg hover:bg-gray-150 transition-colors group">
          {isLoading ? (
            <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          ) : loadError ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-500">
              <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M7 4V7.5M7 9.5V10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-500">
              <path d="M7 1C3.686 1 1 3.686 1 7C1 10.314 3.686 13 7 13C10.314 13 13 10.314 13 7C13 3.686 10.314 1 7 1ZM7 2C9.773 2 12 4.227 12 7C12 9.773 9.773 12 7 12C4.227 12 2 9.773 2 7C2 4.227 4.227 2 7 2Z" fill="currentColor"/>
            </svg>
          )}
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={(e) => e.target.select()}
            className="flex-1 bg-transparent text-sm text-gray-800 focus:outline-none placeholder-gray-400"
            placeholder="Search or enter website name"
          />
          {inputUrl && (
            <button
              onClick={() => setInputUrl('')}
              className="opacity-0 group-hover:opacity-100 w-4 h-4 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-opacity"
            >
              <span className="text-xs">✕</span>
            </button>
          )}
        </div>

        {/* 右侧按钮 */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleReload}
            className="w-7 h-7 flex items-center justify-center text-gray-700 hover:bg-gray-200 rounded-full transition-colors"
            title="Reload"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 7C12 9.761 9.761 12 7 12C4.239 12 2 9.761 2 7C2 4.239 4.239 2 7 2C8.858 2 10.411 3.068 11.243 4.6M11.243 4.6V2M11.243 4.6H8.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {activeTab?.url !== 'about:blank' && (
            <button
              onClick={handleOpenInNewWindow}
              className="w-7 h-7 flex items-center justify-center text-gray-700 hover:bg-gray-200 rounded-full transition-colors"
              title="Open in New Window"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2H12V4M12 2L7 7M5 2H3C2.448 2 2 2.448 2 3V11C2 11.552 2.448 12 3 12H11C11.552 12 12 11.552 12 11V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
          <button
            className="w-7 h-7 flex items-center justify-center text-gray-700 hover:bg-gray-200 rounded-full transition-colors"
            title="Bookmarks"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 2H10C10.552 2 11 2.448 11 3V12L7 9.5L3 12V3C3 2.448 3.448 2 4 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 overflow-hidden bg-white relative">
        {activeTab?.url === 'about:blank' || activeTab?.url === '' ? (
          <div className="h-full flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50">
            <div className="text-center space-y-6 max-w-3xl px-8">
              <div className="text-6xl mb-4">🧭</div>
              <h2 className="text-2xl font-medium text-gray-800">Welcome to Safari</h2>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                Enter a website address or search term in the address bar
              </p>

              {/* 快捷方式网格 - 只显示允许 iframe 的网站 */}
              <div className="mt-12 grid grid-cols-4 gap-6 max-w-2xl mx-auto">
                {[
                  { name: 'Example', url: 'https://example.com', icon: '🌐', description: 'Example domain' },
                  { name: 'Wikipedia', url: 'https://wikipedia.org', icon: '📚', description: 'Free encyclopedia' },
                  { name: 'MDN', url: 'https://developer.mozilla.org', icon: '📖', description: 'Web docs' },
                  { name: 'Archive.org', url: 'https://archive.org', icon: '📦', description: 'Internet archive' },
                  { name: 'W3Schools', url: 'https://w3schools.com', icon: '🎓', description: 'Web tutorials' },
                  { name: 'CodePen', url: 'https://codepen.io', icon: '✏️', description: 'Code editor' },
                  { name: 'JSFiddle', url: 'https://jsfiddle.net', icon: '🎮', description: 'Code playground' },
                  { name: 'Can I Use', url: 'https://caniuse.com', icon: '✅', description: 'Browser support' },
                  { name: 'CSS Tricks', url: 'https://css-tricks.com', icon: '🎨', description: 'CSS articles' },
                  { name: 'Dev.to', url: 'https://dev.to', icon: '💻', description: 'Dev community' },
                  { name: 'StackBlitz', url: 'https://stackblitz.com', icon: '⚡', description: 'Online IDE' },
                  { name: 'Repl.it', url: 'https://replit.com', icon: '🔧', description: 'Code environment' },
                ].map(site => (
                  <button
                    key={site.name}
                    onClick={() => handleNavigate(site.url)}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-100 transition-colors group relative"
                    title={site.description}
                  >
                    <div className="text-3xl group-hover:scale-110 transition-transform">
                      {site.icon}
                    </div>
                    <span className="text-xs text-gray-600">{site.name}</span>
                  </button>
                ))}
              </div>

              <div className="mt-12 p-6 bg-blue-50 rounded-xl text-left max-w-2xl mx-auto">
                <h3 className="text-sm font-medium text-blue-900 mb-3">💡 About iframe Restrictions</h3>
                <div className="space-y-2 text-xs text-blue-800 leading-relaxed">
                  <p>
                    <strong>✅ Sites that work:</strong> Wikipedia, MDN, Example.com, Archive.org, W3Schools, CodePen, JSFiddle, Can I Use
                  </p>
                  <p className="mt-2">
                    <strong>❌ Sites that don't work:</strong> GitHub, Google, YouTube, Twitter, Facebook, Reddit, Stack Overflow
                  </p>
                  <p className="mt-2 text-blue-600">
                    These sites use <code className="bg-blue-100 px-1 rounded">X-Frame-Options</code> or
                    <code className="bg-blue-100 px-1 rounded ml-1">CSP</code> headers to prevent iframe embedding for security.
                  </p>
                  <p className="mt-2">
                    For blocked sites, use the <strong>Open in New Window (↗)</strong> button to view them in your system browser.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : loadError ? (
          <div className="h-full flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 p-8">
            <div className="text-center space-y-6 max-w-md">
              <div className="text-6xl mb-4">🚫</div>
              <h2 className="text-xl font-medium text-gray-800">Cannot Display This Page</h2>
              <p className="text-sm text-gray-600 break-all">
                <code className="bg-gray-100 px-2 py-1 rounded text-xs">{activeTab?.url}</code>
              </p>
              <p className="text-sm text-gray-500">
                This website prevents iframe embedding for security reasons.
                {retryCount > 0 && ` (Attempted ${retryCount} time${retryCount > 1 ? 's' : ''})`}
              </p>

              <div className="flex flex-col gap-3 mt-8">
                <button
                  onClick={handleOpenInNewWindow}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 2H12V4M12 2L7 7M5 2H3C2.448 2 2 2.448 2 3V11C2 11.552 2.448 12 3 12H11C11.552 12 12 11.552 12 11V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Open in New Window
                </button>

                <button
                  onClick={handleReload}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors text-sm"
                >
                  Try Again
                </button>
              </div>

              <div className="mt-8 p-4 bg-green-50 rounded-lg text-left">
                <h3 className="text-sm font-medium text-green-900 mb-2">✅ Try these embeddable sites:</h3>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {[
                    { name: 'Wikipedia', url: 'https://wikipedia.org' },
                    { name: 'MDN', url: 'https://developer.mozilla.org' },
                    { name: 'CSS Tricks', url: 'https://css-tricks.com' },
                    { name: 'CodePen', url: 'https://codepen.io' },
                    { name: 'Dev.to', url: 'https://dev.to' },
                    { name: 'Archive.org', url: 'https://archive.org' },
                  ].map(site => (
                    <button
                      key={site.name}
                      onClick={() => handleNavigate(site.url)}
                      className="px-3 py-2 bg-white text-green-700 rounded hover:bg-green-100 transition-colors text-xs font-medium"
                    >
                      {site.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <iframe
            ref={iframeRef}
            src={activeTab?.url}
            className="w-full h-full border-0"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-popups-to-escape-sandbox allow-downloads"
            title="Browser content"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
          />
        )}

        {isLoading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm text-gray-600">Loading...</p>
              <p className="text-xs text-gray-400 max-w-md truncate px-4">{activeTab?.url}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
