const lines=[
  ["The best ideas don't come from browsing. They come from a ","single moment of clarity","."],
  ["Social media optimizes for ","reputation",". We optimize for ","connection","."],
  ["You shouldn't need a ","profile"," to have a great conversation."],
  ["When nothing is saved, ","everything is honest","."],
  ["We are building the infrastructure for ","human intent","."],
];
export function Manifesto() {
  return (
    <section className="py-24 px-14" id="manifesto">
      <div className="max-w-[760px] mx-auto">
        <div className="font-mono text-[11px] text-[var(--acc)] tracking-[0.16em] uppercase mb-3 text-center">// MANIFESTO</div>
        <h2 className="text-[44px] font-black tracking-[-0.04em] text-center mb-12">We believe in<br/><span className="text-[var(--acc)]">raw intent.</span></h2>
        {lines.map((parts,i)=>(
          <div key={i} className="flex gap-5 py-[22px] border-b border-[var(--border)] last:border-none hover:opacity-100 opacity-80 transition-opacity group">
            <span className="font-mono text-[11px] text-[var(--ink4)] min-w-[28px] mt-1 group-hover:text-[var(--acc)] transition-colors">{String(i+1).padStart(2,'0')}</span>
            <span className="text-[22px] font-bold tracking-[-0.02em] leading-[1.4] text-[var(--ink2)] group-hover:text-[var(--ink)] transition-colors">
              {parts.map((p,j)=>j%2===1?<em key={j} className="not-italic text-[var(--acc)]">{p}</em>:<span key={j}>{p}</span>)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}