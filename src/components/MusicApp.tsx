import React from 'react';

const tracks = [
  { title: 'Liquid Startup', artist: 'Agent Radio', duration: '3:12' },
  { title: 'Ship It Slowly', artist: 'Nightly Builds', duration: '4:01' },
  { title: 'Window Focus', artist: 'Glass Ensemble', duration: '2:46' },
  { title: 'Dock Bounce', artist: 'UI Motions', duration: '3:28' },
];

export const MusicApp: React.FC = () => {
  return (
    <div className="flex h-full flex-col bg-[linear-gradient(180deg,#18181b_0%,#09090b_100%)] text-white">
      <div className="grid flex-1 grid-cols-[320px_1fr] overflow-hidden">
        <aside className="border-r border-white/10 bg-white/5 p-5 backdrop-blur">
          <div className="rounded-3xl bg-gradient-to-br from-fuchsia-500 via-violet-500 to-sky-500 p-8 shadow-2xl">
            <div className="aspect-square rounded-2xl bg-black/20 p-6 backdrop-blur-sm">
              <div className="flex h-full items-center justify-center rounded-2xl border border-white/20 text-6xl">♫</div>
            </div>
          </div>
          <div className="mt-5">
            <h2 className="text-lg font-semibold">Focus Mix</h2>
            <p className="mt-1 text-sm text-white/60">Ambient tracks for building the demo</p>
          </div>
        </aside>

        <main className="overflow-auto p-6">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.24em] text-white/50">Now playing</div>
              <h3 className="mt-2 text-3xl font-semibold">Liquid Startup</h3>
              <p className="mt-1 text-sm text-white/60">Agent Radio</p>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-3 text-sm text-white/80">Demo player</div>
          </div>

          <div className="space-y-2">
            {tracks.map((track, index) => (
              <div key={track.title} className="grid grid-cols-[40px_1fr_80px] items-center gap-4 rounded-2xl px-4 py-3 transition-colors hover:bg-white/8">
                <div className="text-sm text-white/50">{index + 1}</div>
                <div>
                  <div className="text-sm font-medium">{track.title}</div>
                  <div className="mt-1 text-xs text-white/50">{track.artist}</div>
                </div>
                <div className="text-right text-xs text-white/50">{track.duration}</div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <div className="border-t border-white/10 bg-black/30 px-6 py-4">
        <div className="flex items-center gap-4">
          <button className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/80">⏮</button>
          <button className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black">Play</button>
          <button className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/80">⏭</button>
          <div className="ml-4 h-1.5 flex-1 rounded-full bg-white/10">
            <div className="h-1.5 w-1/3 rounded-full bg-white" />
          </div>
          <div className="text-xs text-white/50">1:08 / 3:12</div>
        </div>
      </div>
    </div>
  );
};
