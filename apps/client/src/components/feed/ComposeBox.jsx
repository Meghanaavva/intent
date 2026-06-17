import { useState } from 'react';
import { socket } from '../../lib/socket.js';
import { useAuthStore } from '../../store/authStore.js';
import { useUiStore } from '../../store/uiStore.js';
import { EVENTS } from '../../lib/constants.js';

const VIBES = ['building', 'exploring', 'urgent', 'casual'];

export function ComposeBox() {
  const [text, setText]   = useState('');
  const [vibe, setVibe]   = useState(null);
  const [focused, setFocused] = useState(false);
  const { user }          = useAuthStore();
  const { showToast }     = useUiStore();

  function post() {
    if (!text.trim() || !user) return;
    socket.emit(EVENTS.FEED_POST, {
      text: text.trim(),
      vibe,
      category: 'all',
      anonId: user.anonId,
      userId: user.id,
    });

    // Don't add to feed locally — server broadcasts FEED_NEW back to everyone
    // including the poster, via io.emit(). This avoids fake temp_ ids that
    // break reactions/API calls (Mongo can't cast "temp_..." to ObjectId).
    setText('');
    setVibe(null);
    showToast('Intent posted!');
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      post();
    }
  }

  return (
    <div className="flex justify-center px-14 py-4 border-b border-[var(--border)] flex-shrink-0 bg-white">
      <div className="w-full max-w-[1100px]">
        <div className={`bg-[var(--bg2)] border-[1.5px] rounded-[14px] p-4 transition-colors ${focused ? 'border-[var(--acc)]' : 'border-[var(--border)]'}`}>

          <div className="flex items-center gap-2 mb-2.5">
            <div className="w-7 h-7 rounded-full bg-[var(--acc-l)] text-[var(--acc)] flex items-center justify-center font-mono text-[9px] font-bold flex-shrink-0">
              {user?.anonId?.slice(0, 2)}
            </div>
            <span className="font-mono text-[11px] text-[var(--ink3)] font-medium">{user?.anonId}</span>
          </div>

          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={handleKey}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            rows={2}
            maxLength={160}
            placeholder="What do you want to build, explore, or do right now? (Enter to post)"
            className="w-full bg-transparent border-none text-[14px] font-medium text-[var(--ink)] outline-none resize-none leading-[1.55] placeholder:text-[var(--ink4)]"
          />

          <div className="flex items-center justify-between mt-3">
            <div className="flex gap-1.5 flex-wrap">
              {VIBES.map(v => (
                <button key={v} onClick={() => setVibe(vibe === v ? null : v)}
                  className={`border-[1.5px] px-2.5 py-[3px] rounded-full text-[10px] font-semibold cursor-pointer transition-all font-sans ${
                    vibe === v
                      ? 'border-[var(--acc)] text-[var(--acc)] bg-[var(--acc-l)]'
                      : 'border-[var(--border)] text-[var(--ink3)] hover:border-[var(--acc)] hover:text-[var(--acc)] hover:bg-[var(--acc-l)]'
                  }`}>
                  {v}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[var(--ink4)]">{text.length}/160</span>
              <button
                onClick={post}
                disabled={!text.trim()}
                className="bg-[var(--acc)] text-white border-none px-5 py-2 rounded-[9px] text-[12px] font-bold cursor-pointer hover:bg-[var(--acc-d)] transition-colors disabled:opacity-40"
              >
                Post →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}