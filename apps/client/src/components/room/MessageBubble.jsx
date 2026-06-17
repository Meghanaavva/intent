export function MessageBubble({ msg }) {
  const ts = new Date(msg.timestamp);
  const time = `${String(ts.getHours()).padStart(2,'0')}:${String(ts.getMinutes()).padStart(2,'0')}`;
  return (
    <div className={`max-w-[72%] animate-msgIn ${msg.own?'self-end':'self-start'}`}>
      <div className={`px-[15px] py-[11px] text-[14px] leading-[1.52] font-medium ${msg.own?'bg-[var(--acc)] text-white rounded-[14px_4px_14px_14px]':'bg-[var(--bg2)] border-[1.5px] border-[var(--border)] text-[var(--ink)] rounded-[4px_14px_14px_14px]'}`}>
        {msg.text}
      </div>
      <div className={`font-mono text-[8px] text-[var(--ink4)] mt-1 px-0.5 ${msg.own?'text-right':''}`}>{time}</div>
    </div>
  );
}