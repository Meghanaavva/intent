import { useEffect } from 'react';
import { X, Flame } from 'lucide-react';
import { useUiStore } from '../../store/uiStore.js';
import { useRoomStore } from '../../store/roomStore.js';
import { useIdentityStore } from '../../store/identityStore.js';
import { useSocket } from '../../hooks/useSocket.js';
import { usePresence } from '../../hooks/usePresence.js';
import { CategoryBar } from '../feed/CategoryBar.jsx';
import { ComposeBox } from '../feed/ComposeBox.jsx';
import { FeedList } from '../feed/FeedList.jsx';
import { MatchScreen } from '../match/MatchScreen.jsx';
import { RoomScreen } from '../room/RoomScreen.jsx';

const MATCH_STATUSES = ['matching','connecting','matched'];
const ROOM_STATUSES  = ['connected','left','gone','reported','ended'];

export function AppShell() {
  const { appOpen, closeApp, onlineCount, showToast } = useUiStore();
  const { status, reset } = useRoomStore();
  const { anonId, reset: resetId } = useIdentityStore();

  useSocket();
  usePresence();

  useEffect(() => {
    if (appOpen) showToast('Welcome · You are ' + anonId);
  }, [appOpen]);

  if (!appOpen) return null;

  const isMatch = MATCH_STATUSES.includes(status);
  const isRoom  = ROOM_STATUSES.includes(status);
  const isFeed  = !isMatch && !isRoom;

  function handleClose() {
    closeApp();
    reset();
    resetId();
  }

  return (
    <div className="fixed inset-0 z-[500] flex flex-col bg-white">

      {/* Top nav */}
      <div className="h-[58px] flex items-center justify-center border-b border-[var(--border)] flex-shrink-0 px-14 bg-white">
        <div className="flex items-center justify-between w-full max-w-[1100px]">
          <div className="text-[16px] font-black tracking-[-0.04em]">
            intent<span className="text-[var(--acc)]">.</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-[5px] font-mono text-[10px] text-[var(--ink3)]">
              <div className="w-[6px] h-[6px] rounded-full bg-[var(--green)] animate-blink"></div>
              {onlineCount} online
            </div>
            <div className="font-mono text-[10px] bg-[var(--acc-l)] text-[var(--acc)] rounded-[6px] px-2.5 py-[3px] font-medium">
              {anonId}
            </div>
            <button
              onClick={handleClose}
              className="bg-transparent border-[1.5px] border-[var(--border)] text-[var(--ink3)] w-[30px] h-[30px] rounded-[7px] cursor-pointer flex items-center justify-center hover:border-[var(--border2)] hover:text-[var(--ink)] transition-all"
            ><X size={15} strokeWidth={2.25}/></button>
          </div>
        </div>
      </div>

      {/* Feed screen */}
      {isFeed && (
        <>
          <CategoryBar/>
          <div className="flex justify-center px-14 py-2 border-b border-[var(--border)] flex-shrink-0 bg-[var(--bg2)]">
            <div className="font-mono text-[10px] text-[var(--ink3)] w-full max-w-[1100px] flex items-center gap-1.5">
              <Flame size={12} strokeWidth={2.5} className="text-[var(--acc)]"/>
              Trending —&nbsp;
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

      {/* Match screen */}
      {isMatch && <MatchScreen/>}

      {/* Room screen */}
      {isRoom && <RoomScreen/>}

    </div>
  );
}