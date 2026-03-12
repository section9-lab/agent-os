import React, { useMemo, useState } from 'react';

interface Conversation {
  id: string;
  name: string;
  preview: string;
  messages: { id: string; from: 'them' | 'me'; text: string; time: string }[];
}

const conversations: Conversation[] = [
  {
    id: '1',
    name: 'Agent Researcher',
    preview: 'I finished the summary for the competitor scan.',
    messages: [
      { id: '1', from: 'them', text: 'I finished the summary for the competitor scan.', time: '09:12' },
      { id: '2', from: 'me', text: 'Great. Drop it into Notes next.', time: '09:14' },
      { id: '3', from: 'them', text: 'Done — added a concise version and a full version.', time: '09:15' },
    ],
  },
  {
    id: '2',
    name: 'Automation Agent',
    preview: 'Daily briefing is scheduled for 8:30 AM.',
    messages: [
      { id: '1', from: 'them', text: 'Daily briefing is scheduled for 8:30 AM.', time: 'Yesterday' },
      { id: '2', from: 'me', text: 'Include unread issues and open PRs.', time: 'Yesterday' },
    ],
  },
  {
    id: '3',
    name: 'Design Review',
    preview: 'The glass treatment feels much cleaner now.',
    messages: [
      { id: '1', from: 'them', text: 'The glass treatment feels much cleaner now.', time: 'Mon' },
      { id: '2', from: 'me', text: 'Nice. Let’s keep the window chrome subtle.', time: 'Mon' },
    ],
  },
];

export const MessagesApp: React.FC = () => {
  const [activeId, setActiveId] = useState(conversations[0].id);
  const activeConversation = useMemo(
    () => conversations.find((conversation) => conversation.id === activeId) ?? conversations[0],
    [activeId],
  );

  return (
    <div className="flex h-full bg-[#f5f5f7] text-gray-800">
      <aside className="w-72 border-r border-gray-200 bg-white/80">
        <div className="border-b border-gray-200 px-4 py-3">
          <h2 className="text-sm font-semibold">Messages</h2>
          <p className="mt-1 text-xs text-gray-500">Recent conversations</p>
        </div>
        <div className="space-y-1 p-2">
          {conversations.map((conversation) => {
            const isActive = conversation.id === activeId;
            return (
              <button
                key={conversation.id}
                onClick={() => setActiveId(conversation.id)}
                className={`w-full rounded-xl px-3 py-3 text-left transition-colors ${
                  isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium">{conversation.name}</span>
                </div>
                <p className={`mt-1 truncate text-xs ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                  {conversation.preview}
                </p>
              </button>
            );
          })}
        </div>
      </aside>

      <main className="flex flex-1 flex-col bg-[linear-gradient(180deg,#ffffff_0%,#f7f7f9_100%)]">
        <div className="border-b border-gray-200 px-5 py-4">
          <h3 className="text-sm font-semibold">{activeConversation.name}</h3>
        </div>
        <div className="flex-1 space-y-4 overflow-auto px-5 py-5">
          {activeConversation.messages.map((message) => (
            <div key={message.id} className={`flex ${message.from === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                  message.from === 'me'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-800 border border-gray-200'
                }`}
              >
                <p>{message.text}</p>
                <div className={`mt-2 text-[11px] ${message.from === 'me' ? 'text-white/70' : 'text-gray-400'}`}>
                  {message.time}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 bg-white px-4 py-3">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-400">
            Demo mode — message sending is disabled.
          </div>
        </div>
      </main>
    </div>
  );
};
