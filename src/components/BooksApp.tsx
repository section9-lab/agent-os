import React from 'react';

const books = [
  { title: 'Designing Agent Interfaces', progress: 64, color: 'from-pink-400 to-rose-500' },
  { title: 'Human + AI Workflows', progress: 38, color: 'from-sky-400 to-blue-500' },
  { title: 'Shipping Better Demos', progress: 82, color: 'from-amber-400 to-orange-500' },
  { title: 'Glass UI Patterns', progress: 21, color: 'from-emerald-400 to-green-500' },
];

export const BooksApp: React.FC = () => {
  return (
    <div className="h-full overflow-auto bg-[#f6f3ee] px-6 py-6 text-gray-800">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Library</h2>
            <p className="mt-1 text-sm text-gray-500">A small reading view for the Agent-OS demo.</p>
          </div>
          <div className="rounded-2xl bg-white px-4 py-3 text-sm shadow-sm">4 books · 2 in progress</div>
        </div>

        <div className="grid grid-cols-2 gap-5 xl:grid-cols-4">
          {books.map((book) => (
            <div key={book.title} className="rounded-3xl bg-white p-4 shadow-sm">
              <div className={`h-56 rounded-2xl bg-gradient-to-br ${book.color} p-5 text-white shadow-inner`}>
                <div className="text-xs uppercase tracking-[0.2em] text-white/80">Agent-OS Press</div>
                <div className="mt-6 text-xl font-semibold leading-tight">{book.title}</div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Reading progress</span>
                  <span>{book.progress}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-gray-100">
                  <div className="h-2 rounded-full bg-gray-800" style={{ width: `${book.progress}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
