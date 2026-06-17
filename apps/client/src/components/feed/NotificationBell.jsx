import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../lib/socket.js';
import { getNotificationsApi, getUnreadCountApi, markNotificationsReadApi, getOrCreateThreadApi } from '../../lib/api.js';
import { useAuthStore } from '../../store/authStore.js';

export function NotificationBell() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    getUnreadCountApi().then(({ count }) => setUnread(count)).catch(()=>{});

    function onNew() {
      setUnread(u => u + 1);
    }
    socket.on('notification:new', onNew);
    return () => socket.off('notification:new', onNew);
  }, []);

  async function toggle() {
    const next = !open;
    setOpen(next);
    if (next) {
      const { notifications } = await getNotificationsApi();
      setNotifications(notifications);
      if (unread > 0) {
        await markNotificationsReadApi();
        setUnread(0);
      }
    }
  }

  async function openChat(userId) {
    try {
      const { threadId } = await getOrCreateThreadApi(userId);
      setOpen(false);
      navigate(`/messages?thread=${threadId}`);
    } catch {}
  }

  const ago = (d) => { const s=Math.floor((Date.now()-new Date(d))/1000); if(s<60)return `${s}s`; if(s<3600)return `${Math.floor(s/60)}m`; return `${Math.floor(s/3600)}h`; };

  return (
    <div className="relative">
      <button onClick={toggle} className="relative bg-transparent border-[1.5px] border-[var(--border)] text-[var(--ink3)] w-[30px] h-[30px] rounded-[7px] text-[14px] cursor-pointer flex items-center justify-center hover:border-[var(--border2)] hover:text-[var(--ink)] transition-all">
        🔔
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 bg-[var(--red)] text-white text-[9px] font-bold rounded-full w-[16px] h-[16px] flex items-center justify-center">
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-[300px] max-h-[360px] overflow-y-auto bg-white border-[1.5px] border-[var(--border)] rounded-[12px] shadow-xl p-2">
          <div className="text-[11px] font-bold text-[var(--ink2)] px-2 py-1.5">Notifications</div>
          {notifications.length === 0 && (
            <div className="text-[11px] text-[var(--ink4)] px-2 py-3">No notifications yet.</div>
          )}
          {notifications.map(n => (
            <div key={n.id} className="flex items-start gap-2 px-2 py-2 hover:bg-[var(--bg2)] rounded-[8px] transition-colors">
              <div className="flex-1 min-w-0">
                <div className="text-[11px] text-[var(--ink2)] leading-[1.4]">
                  <span className="font-mono font-semibold">{n.fromUser?.anonId || 'Someone'}</span> reacted to your intent:{' '}
                  <span className="text-[var(--ink3)]">"{n.intentText?.slice(0,40)}{n.intentText?.length>40?'…':''}"</span>
                </div>
                <div className="font-mono text-[9px] text-[var(--ink4)] mt-1">{ago(n.createdAt)} ago</div>
              </div>
              {n.fromUser && (
                <button onClick={()=>openChat(n.fromUser.id)} className="bg-[var(--acc)] text-white border-none px-2.5 py-1 rounded-[6px] text-[10px] font-bold cursor-pointer hover:bg-[var(--acc-d)] transition-colors flex-shrink-0">
                  Message
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}