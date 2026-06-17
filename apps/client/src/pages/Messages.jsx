import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { socket } from '../lib/socket.js';
import { useAuthStore } from '../store/authStore.js';
import { getThreadsApi, getMessagesApi, sendMessageApi } from '../lib/api.js';
import { Spinner } from '../components/ui/Spinner.jsx';

function timeFmt(d) {
  const ts = new Date(d);
  return `${String(ts.getHours()).padStart(2,'0')}:${String(ts.getMinutes()).padStart(2,'0')}`;
}
function agoFmt(d) {
  const s = Math.floor((Date.now() - new Date(d)) / 1000);
  if (s < 60) return `${s}s`;
  if (s < 3600) return `${Math.floor(s/60)}m`;
  if (s < 86400) return `${Math.floor(s/3600)}h`;
  return `${Math.floor(s/86400)}d`;
}

export function Messages() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeThreadId = searchParams.get('thread');

  const [threads, setThreads] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [loadingMessages, setLoadingMessages] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    getThreadsApi().then(({ threads }) => setThreads(threads)).catch(() => setThreads([]));
  }, []);

  useEffect(() => {
    if (!activeThreadId) { setMessages([]); return; }
    setLoadingMessages(true);
    getMessagesApi(activeThreadId)
      .then(({ messages }) => setMessages(messages))
      .finally(() => setLoadingMessages(false));
  }, [activeThreadId]);

  // Live incoming DMs — socket already connected via useGlobalSocket
  useEffect(() => {
    function onMessage({ threadId, message }) {
      if (threadId === activeThreadId) {
        setMessages(prev => [...prev, message]);
      }
      setThreads(prev => {
        if (!prev) return prev;
        const idx = prev.findIndex(t => String(t.threadId) === String(threadId));
        if (idx === -1) return prev;
        const updated = {
          ...prev[idx],
          lastMessage: message.text,
          lastMessageAt: message.createdAt,
          unreadCount: String(threadId) === String(activeThreadId)
            ? 0
            : (prev[idx].unreadCount || 0) + 1,
        };
        return [updated, ...prev.filter((_,i) => i !== idx)];
      });
    }
    socket.on('dm:message', onMessage);
    return () => socket.off('dm:message', onMessage);
  }, [activeThreadId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSend() {
    if (!text.trim() || !activeThreadId) return;
    const body = text.trim();
    setText('');
    const { message } = await sendMessageApi(activeThreadId, body);
    setMessages(prev => [...prev, { ...message, sender: user.id }]);
    setThreads(prev => {
      if (!prev) return prev;
      const idx = prev.findIndex(t => String(t.threadId) === String(activeThreadId));
      if (idx === -1) return prev;
      const updated = { ...prev[idx], lastMessage: message.text, lastMessageAt: message.createdAt };
      return [updated, ...prev.filter((_,i) => i !== idx)];
    });
  }

  function selectThread(threadId) {
    setSearchParams({ thread: String(threadId) });
    setThreads(prev => prev?.map(t =>
      String(t.threadId) === String(threadId) ? { ...t, unreadCount: 0 } : t
    ));
  }

  const activeThread = threads?.find(t => String(t.threadId) === String(activeThreadId));

  return (
    <div className="fixed inset-0 z-[500] flex flex-col bg-white">

      {/* Nav */}
      <div className="h-[58px] flex items-center justify-center border-b border-[var(--border)] flex-shrink-0 px-6 bg-white">
        <div className="flex items-center justify-between w-full max-w-[1100px]">
          <div className="flex items-center gap-3">
            <div className="text-[16px] font-black tracking-[-0.04em] cursor-pointer" onClick={() => navigate('/app')}>
              intent<span className="text-[var(--acc)]">.</span>
            </div>
            <span className="text-[var(--border)]">|</span>
            <span className="text-[13px] font-bold text-[var(--ink2)]">Messages</span>
          </div>
          <button
            onClick={() => navigate('/app')}
            className="bg-transparent border-[1.5px] border-[var(--border)] text-[var(--ink3)] px-3 py-[6px] rounded-[7px] text-[12px] font-semibold cursor-pointer hover:border-[var(--border2)] hover:text-[var(--ink)] transition-all"
          >← Back to feed</button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">

        {/* Thread list */}
        <div className="w-[300px] border-r border-[var(--border)] flex-shrink-0 flex flex-col bg-[var(--bg2)]">
          <div className="px-4 py-3 border-b border-[var(--border)]">
            <span className="text-[11px] font-bold text-[var(--ink3)] uppercase tracking-wide">Conversations</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            {threads === null && <div className="flex justify-center py-8"><Spinner/></div>}
            {threads?.length === 0 && (
              <div className="text-[12px] text-[var(--ink4)] p-5 text-center leading-[1.7]">
                No conversations yet.<br/>React to a post or get a reaction to start chatting.
              </div>
            )}
            {threads?.map(t => (
              <button
                key={t.threadId}
                onClick={() => selectThread(t.threadId)}
                className={`w-full text-left px-4 py-3.5 border-b border-[var(--border)] transition-colors flex items-center gap-3 ${
                  String(t.threadId) === String(activeThreadId)
                    ? 'bg-white border-l-[3px] border-l-[var(--acc)]'
                    : 'hover:bg-white'
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-[var(--acc-l)] text-[var(--acc)] flex items-center justify-center font-mono text-[11px] font-bold flex-shrink-0">
                  {t.otherUser?.anonId?.slice(0,2) || '??'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <span className="font-mono text-[12px] font-bold text-[var(--ink)] truncate">{t.otherUser?.anonId || 'Unknown'}</span>
                    <span className="font-mono text-[9px] text-[var(--ink4)] flex-shrink-0">{agoFmt(t.lastMessageAt)}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] text-[var(--ink3)] truncate">{t.lastMessage || 'Say hi 👋'}</span>
                    {t.unreadCount > 0 && (
                      <span className="bg-[var(--acc)] text-white text-[9px] font-bold rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center flex-shrink-0">
                        {t.unreadCount > 9 ? '9+' : t.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat window */}
        <div className="flex-1 flex flex-col bg-white">
          {!activeThreadId && (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center px-8">
              <div className="text-[32px]">💬</div>
              <div className="text-[14px] font-bold text-[var(--ink2)]">Your messages</div>
              <div className="text-[12px] text-[var(--ink4)] max-w-[240px] leading-[1.7]">
                Select a conversation to start chatting, or react to someone's intent to connect.
              </div>
            </div>
          )}

          {activeThreadId && (
            <>
              {/* Chat header */}
              <div className="h-[56px] border-b border-[var(--border)] flex items-center px-6 flex-shrink-0 gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--acc-l)] text-[var(--acc)] flex items-center justify-center font-mono text-[10px] font-bold flex-shrink-0">
                  {activeThread?.otherUser?.anonId?.slice(0,2) || '??'}
                </div>
                <div>
                  <div className="font-mono text-[13px] font-bold text-[var(--ink)]">
                    {activeThread?.otherUser?.anonId || '…'}
                  </div>
                  <div className="font-mono text-[9px] text-[var(--green)]">● active</div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-3">
                {loadingMessages && <div className="flex justify-center py-8"><Spinner/></div>}
                {!loadingMessages && messages.length === 0 && (
                  <div className="text-center text-[12px] text-[var(--ink4)] py-10">
                    No messages yet. Say hi 👋
                  </div>
                )}
                {messages.map(m => {
                  const own = m.sender === user.id;
                  return (
                    <div key={m.id} className={`max-w-[68%] ${own ? 'self-end' : 'self-start'}`}>
                      <div className={`px-4 py-2.5 text-[14px] leading-[1.55] font-medium rounded-[14px] ${
                        own
                          ? 'bg-[var(--acc)] text-white rounded-br-[4px]'
                          : 'bg-[var(--bg2)] border-[1.5px] border-[var(--border)] text-[var(--ink)] rounded-bl-[4px]'
                      }`}>
                        {m.text}
                      </div>
                      <div className={`font-mono text-[9px] text-[var(--ink4)] mt-1 ${own ? 'text-right' : ''}`}>
                        {timeFmt(m.createdAt)}
                      </div>
                    </div>
                  );
                })}
                <div ref={bottomRef}/>
              </div>

              {/* Input */}
              <div className="border-t border-[var(--border)] px-6 py-3 flex gap-2.5 flex-shrink-0 bg-white">
                <input
                  value={text}
                  onChange={e => setText(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleSend(); } }}
                  placeholder="Type a message…"
                  className="flex-1 bg-[var(--bg2)] border-[1.5px] border-[var(--border)] rounded-[10px] px-4 py-2.5 text-[14px] outline-none focus:border-[var(--acc)] transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={!text.trim()}
                  className="bg-[var(--acc)] text-white border-none px-5 py-2.5 rounded-[10px] text-[13px] font-bold cursor-pointer hover:bg-[var(--acc-d)] transition-colors disabled:opacity-40"
                >
                  Send ↑
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}