const items=['REAL-TIME FEED','ATOMIC MATCHING','ZERO PROFILES','EPHEMERAL ROOMS','ANONYMOUS IDENTITY','AI SAFETY LAYER','POSTS SELF-DESTRUCT','ALWAYS LIVE'];
export function Ticker() {
  const all=[...items,...items];
  return (
    <div className="overflow-hidden py-[15px] bg-[var(--acc)]">
      <div className="flex animate-tick w-max">
        {all.map((item,i)=>(
          <div key={i} className="font-mono text-[12px] text-white/70 px-8 whitespace-nowrap flex items-center gap-3">
            {item}<span className="text-white/30">——</span>
          </div>
        ))}
      </div>
    </div>
  );
}
