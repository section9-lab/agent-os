import React from 'react';

const sections = [
  { title: 'Appearance', detail: 'Liquid glass desktop theme enabled' },
  { title: 'Notifications', detail: 'Banners on · Sounds off' },
  { title: 'Workspace', detail: '3 demo apps pinned to recents' },
  { title: 'Privacy', detail: 'Local-only demo mode' },
];

export const SettingsApp: React.FC = () => {
  return (
    <div className="flex h-full bg-[#f5f5f7] text-gray-800">
      <aside className="w-72 border-r border-gray-200 bg-white/80 p-4">
        <h2 className="px-2 text-sm font-semibold">Settings</h2>
        <div className="mt-4 space-y-1">
          {['General', 'Appearance', 'Desktop & Dock', 'Notifications', 'Privacy'].map((item, index) => (
            <button
              key={item}
              className={`w-full rounded-xl px-3 py-3 text-left text-sm transition-colors ${
                index === 0 ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </aside>

      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-3xl space-y-4">
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold">System overview</h3>
            <p className="mt-2 text-sm text-gray-500">This panel is a demo implementation for the dock icon.</p>
          </div>

          {sections.map((section) => (
            <div key={section.title} className="rounded-3xl bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold">{section.title}</div>
                  <div className="mt-1 text-sm text-gray-500">{section.detail}</div>
                </div>
                <div className="flex h-7 w-12 items-center rounded-full bg-blue-500 p-1">
                  <div className="ml-auto h-5 w-5 rounded-full bg-white shadow" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
