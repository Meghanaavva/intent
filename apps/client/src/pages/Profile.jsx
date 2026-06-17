import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore.js';
import { getProfileStatsApi } from '../lib/api.js';
import { Spinner } from '../components/ui/Spinner.jsx';

export function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProfileStatsApi()
      .then(setData)
      .catch(err => setError(err.response?.data?.error || 'Failed to load profile'));
  }, []);

  function handleLogout() { logout(); navigate('/'); }

  const joined = data
    ? new Date(data.user.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  return (
    <div className="fixed inset-0 z-[500] flex flex-col bg-white">
      <div className="h-[58px] flex items-center justify-center border-b border-[var(--border)] flex-shrink-0 px-6 bg-white">
        <div className="flex items-center justify-between w-full max-w-[1100px]">
          <div className="text-[16px] font-black tracking-[-0.04em] cursor-pointer" onClick={() => navigate('/app')}>
            intent<span className="text-[var(--acc)]">.</span>
          </div>
          <button onClick={() => navigate('/app')}
            className="bg-transparent border-[1.5px] border-[var(--border)] text-[var(--ink3)] px-3 py-[6px] rounded-[7px] text-[12px] font-semibold cursor-pointer hover:border-[var(--border2)] hover:text-[var(--ink)] transition-all">
            ← Back to feed
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto flex justify-center px-6 py-10">
        <div className="w-full max-w-[600px]">
          {!data && !error && <div className="flex justify-center py-16"><Spinner/></div>}
          {error && <div className="text-[13px] text-[var(--red)] py-4">{error}</div>}

          {data && (
            <div className="flex flex-col gap-5">

              {/* Identity card */}
              <div className="bg-[var(--bg2)] border-[1.5px] border-[var(--border)] rounded-[16px] p-6 flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-[var(--acc-l)] text-[var(--acc)] flex items-center justify-center font-mono text-[20px] font-black flex-shrink-0">
                  {data.user.anonId.slice(0,2)}
                </div>
                <div className="min-w-0">
                  <div className="text-[20px] font-black text-[var(--ink)]">@{data.user.username}</div>
                  <div className="font-mono text-[11px] text-[var(--acc)] bg-[var(--acc-l)] inline-block px-2 py-[2px] rounded-[5px] mt-1">{data.user.anonId}</div>
                  <div className="text-[11px] text-[var(--ink4)] mt-1.5">Member since {joined}</div>
                </div>
              </div>

              {/* Stats */}
              <div>
                <div className="text-[11px] font-bold text-[var(--ink3)] uppercase tracking-wide mb-2">Activity</div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: data.stats.postsCount,       label: 'Intents posted',    color: 'var(--ink)' },
                    { value: data.stats.reactionsReceived, label: 'Reactions received', color: 'var(--acc)' },
                    { value: data.stats.reactionsGiven,   label: 'Reactions given',   color: 'var(--ink)' },
                  ].map(s => (
                    <div key={s.label} className="bg-white border-[1.5px] border-[var(--border)] rounded-[12px] p-4 text-center">
                      <div className="text-[26px] font-black" style={{ color: s.color }}>{s.value}</div>
                      <div className="text-[10px] text-[var(--ink3)] mt-1 leading-[1.4]">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Private account details */}
              <div>
                <div className="text-[11px] font-bold text-[var(--ink3)] uppercase tracking-wide mb-2">Account (only visible to you)</div>
                <div className="bg-white border-[1.5px] border-[var(--border)] rounded-[12px] divide-y divide-[var(--border)]">
                  {[
                    { label: 'Email',    value: data.user.email },
                    { label: 'Username', value: `@${data.user.username}` },
                    { label: 'Public anonymous ID', value: data.user.anonId },
                  ].map(row => (
                    <div key={row.label} className="flex items-center justify-between px-4 py-3">
                      <span className="text-[12px] text-[var(--ink3)]">{row.label}</span>
                      <span className="text-[12px] font-semibold text-[var(--ink)] font-mono">{row.value}</span>
                    </div>
                  ))}
                </div>
                <div className="text-[10px] text-[var(--ink4)] mt-2 leading-[1.7]">
                  Other users only see your anonymous ID ({data.user.anonId}). Your email and username are never shared.
                </div>
              </div>

              {/* Settings */}
              <div>
                <div className="text-[11px] font-bold text-[var(--ink3)] uppercase tracking-wide mb-2">Settings</div>
                <div className="bg-white border-[1.5px] border-[var(--border)] rounded-[12px] divide-y divide-[var(--border)] overflow-hidden">
                  <button onClick={() => navigate('/messages')} className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-[var(--bg2)] transition-colors cursor-pointer bg-transparent border-none text-left">
                    <span className="text-[13px] font-medium text-[var(--ink)]">💬 My messages</span>
                    <span className="text-[var(--ink4)] text-[12px]">→</span>
                  </button>
                  <button onClick={() => navigate('/app')} className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-[var(--bg2)] transition-colors cursor-pointer bg-transparent border-none text-left">
                    <span className="text-[13px] font-medium text-[var(--ink)]">🏠 Back to feed</span>
                    <span className="text-[var(--ink4)] text-[12px]">→</span>
                  </button>
                  <button onClick={handleLogout} className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-red-50 transition-colors cursor-pointer bg-transparent border-none text-left">
                    <span className="text-[13px] font-medium text-red-500">⏻ Log out</span>
                    <span className="text-red-400 text-[12px]">→</span>
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}