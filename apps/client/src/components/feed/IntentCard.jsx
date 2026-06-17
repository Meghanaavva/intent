import { useState } from 'react';
import { useMatch } from '../../hooks/useMatch.js';
import { useAuthStore } from '../../store/authStore.js';
import { useUiStore } from '../../store/uiStore.js';
import { reactToIntentApi } from '../../lib/api.js';
import { ReactionsPopover } from './ReactionsPopover.jsx';

const VIBE_COLORS = {
  building:  'bg-blue-50   text-blue-600   border-blue-200',
  exploring: 'bg-green-50  text-green-600  border-green-200',
  urgent:    'bg-red-50    text-red-500    border-red-200',
  casual:    'bg-purple-50 text-purple-600 border-purple-200',
};

function ago(d) {
  const s = Math.floor((Date.now() - new Date(d)) / 1000);
  if (s < 60)   return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  return `${Math.floor(s / 3600)}h ago`;
}

export function IntentCard({ intent, delay = 0 }) {
  const { joinIntent } = useMatch();
  const { user } = useAuthStore();
  const { showToast } = useUiStore();
  const [reacted, setReacted]           = useState(false);
  const [showReactions, setShowReactions] = useState(false);

  const isOwnPost = intent.userId && user && String(intent.userId) === String(user.id);

  async function react() {
    if (reacted) return;
    try {
      const res = await reactToIntentApi(intent._id);
      setReacted(true);
      showToast(res.alreadyReacted ? 'Already reacted' : 'Reaction sent ❤️');
    } catch (err) {
      showToast(err.response?.data?.error || 'Could not react');
    }
  }

  return (
    <div
      className="bg-white border-[1.5px] border-[var(--border)] rounded-[14px] p-5 hover:border-[var(--border2)] hover:shadow-sm transition-all animate-cardIn"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Top row: avatar + name + vibe + time */}
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-8 h-8 rounded-full bg-[var(--acc-l)] text-[var(--acc)] flex items-center justify-center font-mono text-[10px] font-bold flex-shrink-0">
          {intent.anonId?.slice(0, 2) || '??'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-[12px] font-bold text-[var(--ink)]">{intent.anonId}</span>
            {intent.vibe && (
              <span className={`text-[10px] font-semibold border px-2 py-[1px] rounded-full ${VIBE_COLORS[intent.vibe] || 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                {intent.vibe}
              </span>
            )}
          </div>
        </div>
        <span className="font-mono text-[10px] text-[var(--ink4)] flex-shrink-0">{ago(intent.createdAt)}</span>
      </div>

      {/* Full intent text — no truncation */}
      <p className="text-[15px] font-semibold text-[var(--ink)] leading-[1.55] mb-4">
        {intent.text}
      </p>

      {/* Action row */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {/* React — others' posts only */}
          {!isOwnPost && (
            <button
              onClick={react}
              className={`flex items-center gap-1.5 border-[1.5px] px-3 py-1.5 rounded-[8px] text-[12px] font-semibold cursor-pointer transition-all ${
                reacted
                  ? 'border-[var(--acc)] text-[var(--acc)] bg-[var(--acc-l)]'
                  : 'border-[var(--border)] text-[var(--ink3)] hover:border-[var(--acc)] hover:text-[var(--acc)] hover:bg-[var(--acc-l)]'
              }`}
            >
              {reacted ? '❤️' : '🤍'} {reacted ? 'Interested' : 'Interested?'}
            </button>
          )}

          {/* Reactions — own posts only */}
          {isOwnPost && (
            <div className="relative">
              <button
                onClick={() => setShowReactions(s => !s)}
                className="flex items-center gap-1.5 border-[1.5px] border-[var(--border)] text-[var(--ink3)] px-3 py-1.5 rounded-[8px] text-[12px] font-semibold cursor-pointer hover:border-[var(--acc)] hover:text-[var(--acc)] hover:bg-[var(--acc-l)] transition-all"
              >
                ❤️ See reactions
              </button>
              {showReactions && (
                <ReactionsPopover intentId={intent._id} onClose={() => setShowReactions(false)} />
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isOwnPost && (
            <span className="text-[10px] font-mono text-[var(--ink4)] bg-[var(--bg2)] px-2.5 py-1 rounded-[6px]">your post</span>
          )}
          {!isOwnPost && (
            <button
              onClick={() => joinIntent(intent)}
              className="bg-[var(--acc)] text-white border-none px-5 py-2 rounded-[9px] text-[13px] font-bold cursor-pointer hover:bg-[var(--acc-d)] hover:-translate-y-px transition-all"
            >
              Join Flow →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}