import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../lib/socket.js';
import { useUiStore } from '../store/uiStore.js';
import { useRoomStore } from '../store/roomStore.js';
import { useAuthStore } from '../store/authStore.js';
import { useSocket } from '../hooks/useSocket.js';
import { usePresence } from '../hooks/usePresence.js';
import { getUnreadDMCountApi } from '../lib/api.js';
import { CategoryBar } from '../components/feed/CategoryBar.jsx';
import { ComposeBox } from '../components/feed/ComposeBox.jsx';
import { FeedList } from '../components/feed/FeedList.jsx';
import { NotificationBell } from '../components/feed/NotificationBell.jsx';
import { MatchScreen } from '../components/match/MatchScreen.jsx';
import { RoomScreen } from '../components/room/RoomScreen.jsx';
import { Toast } from '../components/ui/Toast.jsx';

const MATCH_STATUSES = ['matching','connecting','matched'];
const ROOM_STATUSES  = ['connected','left','gone','reported','ended'];

export function AppPage() {
  const navigate = useNavigate();
  const { onlineCount, showToast } = useUiStore();
  const { status, reset } = useRoomStore();
  const { user, logout } = useAuthStore();
  const [unreadDMs, setUnreadDMs] = useState(0);

  useSocket();
  usePresence();

  useEffect(() => {
    if (user) showToast('Welcome back · ' + user.anonId);
    getUnreadDMCountApi().then(({ count }) => setUnreadDMs(count)).catch(() => {});
    function onDM() { setUnreadDMs(c => c + 1); }
    socket.on('dm:message', onDM);
    return () => socket.off('dm:message', onDM);
  }, []);

  const isMatch = MATCH_STATUSES.includes(status);
  const isRoom  = ROOM_STATUSES.includes(status);
  const isFeed  = !isMatch && !isRoom;

  function handleLogout() { reset(); logout(); navigate('/'); }

  return (
    <div className="fixed inset-0 z-[500] flex flex-col bg-white">

      {/* Top nav */}
      <div className="h-[58px] flex items-center justify-center border-b border-[var(--border)] flex-shrink-0 px-14 bg-white">
        <div className="flex items-center justify-between w-full max-w-[1100px]">
          <div className="text-[16px] font-black tracking-[-0.04em]">
            intent<span className="text-[var(--acc)]">.</span>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-[5px] font-mono text-[10px] text-[var(--ink3)] mr-1">
              <div className="w-[6px] h-[6px] rounded-full bg-[var(--green)] animate-blink"/>
              {onlineCount} online
            </div>

            {/* Messages — highlighted labeled button */}
            <button
              onClick={() => navigate('/messages')}
              className="relative flex items-center gap-1.5 bg-[var(--acc-l)] text-[var(--acc)] border-[1.5px] border-[var(--acc)] px-3.5 py-[7px] rounded-[8px] text-[12px] font-bold cursor-pointer hover:bg-[var(--acc)] hover:text-white transition-all"
            >
              💬 Messages
              {unreadDMs > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[var(--red)] text-white text-[9px] font-bold rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center border-2 border-white">
                  {unreadDMs > 9 ? '9+' : unreadDMs}
                </span>
              )}
            </button>

            <NotificationBell/>

            {/* Profile pill — click to go to profile */}
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center gap-1.5 font-mono text-[10px] bg-[var(--bg2)] border-[1.5px] border-[var(--border)] text-[var(--ink2)] rounded-[8px] px-2.5 py-[6px] cursor-pointer hover:border-[var(--acc)] hover:text-[var(--acc)] transition-all"
            >
              <span className="w-[18px] h-[18px] rounded-full bg-[var(--acc-l)] text-[var(--acc)] flex items-center justify-center text-[8px] font-bold flex-shrink-0">
                {user?.anonId?.slice(0,2)}
              </span>
              {user?.anonId}
            </button>

            <button
              onClick={handleLogout}
              title="Log out"
              className="bg-transparent border-[1.5px] border-[var(--border)] text-[var(--ink3)] w-[30px] h-[30px] rounded-[7px] text-[15px] cursor-pointer flex items-center justify-center hover:border-red-400 hover:text-red-400 transition-all"
            >⏻</button>
          </div>
        </div>
      </div>

      {isFeed && (
        <>
          <CategoryBar/>
          <div className="flex justify-center px-14 py-2 border-b border-[var(--border)] flex-shrink-0 bg-[var(--bg2)]">
            <div className="font-mono text-[10px] text-[var(--ink3)] w-full max-w-[1100px]">
              🔥 Trending —&nbsp;
              <span className="text-[var(--acc)] font-medium">AI tools</span> ·&nbsp;
              <span className="text-[var(--acc)] font-medium">SaaS ideas</span> ·&nbsp;
              <span className="text-[var(--acc)] font-medium">travel hacks</span> ·&nbsp;
              <span className="text-[var(--acc)] font-medium">open source</span>
            </div>
          </div>
          <ComposeBox/>
          <FeedList/>
        </>
      )}

      {isMatch && <MatchScreen/>}
      {isRoom  && <RoomScreen/>}
      <Toast/>
    </div>
  );
}
