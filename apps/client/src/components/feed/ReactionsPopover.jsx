import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getReactionsApi, getOrCreateThreadApi } from '../../lib/api.js';
import { Spinner } from '../ui/Spinner.jsx';

export function ReactionsPopover({ intentId, onClose }) {
  const navigate = useNavigate();
  const [reactions, setReactions] = useState(null);
  const [error, setError] = useState(null);
  const [opening, setOpening] = useState(null);

  useEffect(() => {
  if (!intentId || String(intentId).startsWith('temp_')) {
    setError('This post is still syncing — try again in a moment.');
    return;
  }
  getReactionsApi(intentId)
    .then(({ reactions }) => setReactions(reactions))
    .catch(err => setError(err.response?.data?.error || 'Failed to load reactions'));
}, [intentId]);

  async function openChat(userId) {
    setOpening(userId);
    try {
      const { threadId } = await getOrCreateThreadApi(userId);
      navigate(`/messages?thread=${threadId}`);
    } catch {
      setOpening(null);
    }
  }

  // Fixed-position modal so it's never clipped by overflow containers
  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/30"
      onClick={onClose}
    >
      <div
        className="w-[340px] max-h-[70vh] bg-white border-[1.5px] border-[var(--border)] rounded-[16px] shadow-2xl p-5 overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-[15px] font-bold text-[var(--ink)]">❤️ Reactions</span>
          <button
            onClick={onClose}
            className="text-[var(--ink4)] hover:text-[var(--ink)] cursor-pointer border-none bg-transparent w-7 h-7 flex items-center justify-center rounded-full hover:bg-[var(--bg2)] text-[16px]"
          >✕</button>
        </div>

        {!reactions && !error && (
          <div className="flex justify-center py-8"><Spinner size={22}/></div>
        )}
        {error && (
          <div className="text-[12px] text-[var(--red)] py-2">{error}</div>
        )}
        {reactions && reactions.length === 0 && (
          <div className="text-[13px] text-[var(--ink4)] py-6 text-center">
            No reactions yet.<br/>
            <span className="text-[11px]">Share your post to get noticed!</span>
          </div>
        )}
        {reactions && reactions.length > 0 && (
          <div className="flex flex-col gap-2.5 overflow-y-auto">
            {reactions.map(r => (
              <div key={r.id} className="flex items-center justify-between gap-3 bg-[var(--bg2)] rounded-[10px] px-3.5 py-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-[var(--acc-l)] text-[var(--acc)] flex items-center justify-center font-mono text-[10px] font-bold flex-shrink-0">
                    {r.user.anonId.slice(0, 2)}
                  </div>
                  <span className="font-mono text-[12px] text-[var(--ink2)] truncate">{r.user.anonId}</span>
                </div>
                <button
                  onClick={() => openChat(r.user.id)}
                  disabled={opening === r.user.id}
                  className="bg-[var(--acc)] text-white border-none px-3.5 py-1.5 rounded-[8px] text-[12px] font-bold cursor-pointer hover:bg-[var(--acc-d)] transition-colors disabled:opacity-60 flex-shrink-0"
                >
                  {opening === r.user.id ? '…' : 'Message'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
