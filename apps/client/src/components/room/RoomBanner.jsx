import { Hand, CloudFog, Shield, Sparkles } from 'lucide-react';
import { useRoomStore } from '../../store/roomStore.js';
import { useIdentityStore } from '../../store/identityStore.js';
import { useUiStore } from '../../store/uiStore.js';
const BANNERS = {
  left:     { icon:Hand,     title:'You left the chat.',     sub:"The session has ended. Nothing was saved. Your identity has been reset.",            btn:'Back to Feed' },
  gone:     { icon:CloudFog, title:'They left the chat.',    sub:"Happens. The session is over. Find someone new on the feed.",                        btn:'Find someone new' },
  reported: { icon:Shield,   title:'Session closed.',        sub:"Your report has been logged. This session has been permanently ended. Thank you.",    btn:'Back to Feed' },
  ended:    { icon:Sparkles, title:'That was a good one.',   sub:"The conversation is over. Nothing was saved — just the memory.",                      btn:'Back to Feed' },
};
export function RoomBanner() {
  const { status, reset } = useRoomStore();
  const { reset: resetId } = useIdentityStore();
  const { showToast } = useUiStore();
  const b = BANNERS[status];
  if(!b) return null;
  const Icon = b.icon;
  function goFeed(){reset();resetId();showToast('New identity assigned');}
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-12 bg-white">
      <div className="w-[64px] h-[64px] rounded-full bg-[var(--bg2)] flex items-center justify-center"><Icon size={28} strokeWidth={1.75} className="text-[var(--ink2)]"/></div>
      <div className="text-[22px] font-black tracking-[-0.03em]">{b.title}</div>
      <div className="text-[14px] text-[var(--ink3)] leading-[1.65] max-w-[320px]">{b.sub}</div>
      <button onClick={goFeed} className="bg-[var(--acc)] text-white border-none px-7 py-3 rounded-[9px] text-[14px] font-bold cursor-pointer hover:bg-[var(--acc-d)] transition-colors mt-2">{b.btn}</button>
    </div>
  );
}