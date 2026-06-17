import { useState, useRef, useEffect } from 'react';
import { Flag, ArrowUp } from 'lucide-react';
import { useRoomStore } from '../../store/roomStore.js';
import { useIdentityStore } from '../../store/identityStore.js';
import { useRoom } from '../../hooks/useRoom.js';
import { MessageBubble } from './MessageBubble.jsx';
import { RoomBanner } from './RoomBanner.jsx';

export function RoomScreen() {
  const { messages, status, roomId } = useRoomStore();
  const { anonId } = useIdentityStore();
  const { sendMessage, leaveRoom, reportRoom } = useRoom();
  const [text, setText] = useState('');
  const bottomRef = useRef(null);
  const active = !['left','gone','reported','ended'].includes(status);

  useEffect(()=>{ bottomRef.current?.scrollIntoView({behavior:'smooth'}); },[messages]);

  function send(){ if(!text.trim())return; sendMessage(text); setText(''); }
  function onKey(e){ if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send();} }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white">
      {/* Room Nav */}
      <div className="h-[56px] flex items-center justify-center border-b border-[var(--border)] flex-shrink-0 px-14">
        <div className="flex items-center justify-between w-full max-w-[1100px]">
          <div className="flex items-center gap-2.5">
            <div className="font-mono text-[11px] text-[var(--ink3)] bg-[var(--bg2)] border border-[var(--border)] rounded-[6px] px-3 py-1">{anonId}</div>
            <div className="flex items-center gap-[5px] font-mono text-[10px] text-[var(--ink4)]">
              <div className="w-[5px] h-[5px] rounded-full bg-[var(--green)] animate-blink"></div>
              ephemeral · nothing saved
            </div>
          </div>
          {active && (
            <div className="flex gap-2">
              <button onClick={reportRoom} className="bg-transparent border-none font-mono text-[11px] text-[var(--ink4)] cursor-pointer px-3 py-[6px] rounded-[6px] hover:text-red-400 hover:bg-red-50 transition-all inline-flex items-center gap-1"><Flag size={12} strokeWidth={2.25}/> Report</button>
              <button onClick={leaveRoom} className="bg-transparent border-[1.5px] border-[var(--border)] text-[var(--ink2)] px-4 py-[6px] rounded-[7px] text-[12px] font-semibold cursor-pointer hover:border-red-400 hover:text-red-400 transition-all">Leave chat</button>
            </div>
          )}
        </div>
      </div>

      {/* Chat area or banner */}
      {active ? (
        <>
          <div className="flex-1 overflow-y-auto flex justify-center px-14 py-5">
            <div className="w-full max-w-[780px] flex flex-col gap-2.5">
              <div className="text-center font-mono text-[10px] text-[var(--ink4)] py-1">connected · anonymous · nothing is saved</div>
              {messages.map((m,i)=><MessageBubble key={i} msg={m}/>)}
              <div ref={bottomRef}/>
            </div>
          </div>
          <div className="flex justify-center border-t border-[var(--border)] flex-shrink-0 px-14 py-3">
            <div className="w-full max-w-[780px] flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-[var(--ink4)] whitespace-nowrap">share contact (optional):</span>
                <input className="flex-1 bg-transparent border-[1.5px] border-[var(--border)] text-[var(--ink2)] px-2.5 py-1.5 rounded-[7px] font-mono text-[11px] outline-none focus:border-[var(--acc)] transition-colors" placeholder="email · discord · twitter…"/>
              </div>
              <div className="flex gap-2.5 items-end">
                <textarea value={text} onChange={e=>setText(e.target.value)} onKeyDown={onKey} rows={1} placeholder="say something…"
                  className="flex-1 bg-[var(--bg2)] border-[1.5px] border-[var(--border)] text-[var(--ink)] px-3.5 py-[11px] rounded-[10px] font-sans text-[14px] font-medium resize-none outline-none max-h-[80px] leading-[1.5] focus:border-[var(--acc)] transition-colors placeholder:text-[var(--ink4)]"/>
                <button onClick={send} className="bg-[var(--acc)] text-white border-none w-[42px] h-[42px] rounded-[9px] cursor-pointer flex items-center justify-center hover:bg-[var(--acc-d)] transition-colors flex-shrink-0"><ArrowUp size={18} strokeWidth={2.5}/></button>
              </div>
            </div>
          </div>
        </>
      ) : <RoomBanner/>}
    </div>
  );
}