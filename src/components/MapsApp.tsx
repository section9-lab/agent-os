import React from 'react';

const places = [
  { name: 'Agent HQ', eta: '6 min', detail: 'Product workspace' },
  { name: 'Design Studio', eta: '12 min', detail: 'UI iteration session' },
  { name: 'Launch Center', eta: '18 min', detail: 'Release checklist review' },
];

export const MapsApp: React.FC = () => {
  return (
    <div className="flex h-full bg-white text-gray-800">
      <aside className="w-80 border-r border-gray-200 bg-[#f7f7f9] p-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="text-sm font-semibold">Search</div>
          <div className="mt-3 rounded-xl bg-gray-100 px-4 py-3 text-sm text-gray-400">
            Search places, routes, and favorites
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="text-sm font-semibold">Favorites</div>
          <div className="mt-3 space-y-3">
            {places.map((place) => (
              <div key={place.name} className="rounded-xl bg-gray-50 p-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium">{place.name}</div>
                    <div className="mt-1 text-xs text-gray-500">{place.detail}</div>
                  </div>
                  <div className="text-xs font-medium text-blue-600">{place.eta}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <main className="relative flex-1 overflow-hidden bg-[radial-gradient(circle_at_20%_20%,#dbeafe_0%,#bfdbfe_20%,#d1fae5_45%,#f8fafc_100%)]">
        <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(to_right,rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute left-[18%] top-[22%] h-24 w-24 rounded-full bg-blue-500/20 blur-2xl" />
        <div className="absolute bottom-[18%] right-[20%] h-32 w-32 rounded-full bg-emerald-400/25 blur-3xl" />

        <div className="absolute left-[22%] top-[28%] rounded-2xl border border-white/60 bg-white/75 px-4 py-3 shadow-lg backdrop-blur">
          <div className="text-sm font-semibold">Agent HQ</div>
          <div className="mt-1 text-xs text-gray-500">Current focus area</div>
        </div>

        <div className="absolute left-[48%] top-[45%] rounded-2xl border border-white/60 bg-white/75 px-4 py-3 shadow-lg backdrop-blur">
          <div className="text-sm font-semibold">Design Studio</div>
          <div className="mt-1 text-xs text-gray-500">Prototype review</div>
        </div>

        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 700" preserveAspectRatio="none">
          <path d="M220 220 C 320 260, 420 260, 520 340 S 760 420, 820 510" fill="none" stroke="#2563eb" strokeWidth="8" strokeLinecap="round" strokeDasharray="18 14" opacity="0.75" />
        </svg>

        <div className="absolute bottom-6 left-6 rounded-2xl border border-gray-200 bg-white/90 px-4 py-4 shadow-lg backdrop-blur">
          <div className="text-sm font-semibold">Route preview</div>
          <div className="mt-2 text-xs text-gray-600">Agent HQ → Design Studio</div>
          <div className="mt-1 text-xs text-blue-600">12 min · smooth traffic</div>
        </div>
      </main>
    </div>
  );
};
