import { useUiStore } from '../../store/uiStore.js';
export function Footer() {
  const { openApp } = useUiStore();
  return (
    <footer className="bg-[var(--ink)] px-14 py-14">
      <div className="flex justify-between mb-10 pb-10 border-b border-white/[0.08]">
        <div>
          <div className="text-[22px] font-black tracking-[-0.05em] text-white">intent<span className="text-purple-400">.</span></div>
          <div className="text-[13px] text-white/40 mt-1">find your person. right now.</div>
        </div>
        <div className="flex gap-14">
          {[['Product',['Features','How it works','Try it live']],['Company',['Manifesto','About','Contact']],['Legal',['Privacy','Terms']]].map(([title,links]) => (
            <div key={title}>
              <div className="font-mono text-[10px] text-white/30 tracking-[0.12em] uppercase mb-3">{title}</div>
              <div className="flex flex-col gap-2">
                {links.map(l=><a key={l} onClick={l==='Try it live'?openApp:undefined} className="text-[13px] text-white/45 hover:text-white transition-colors cursor-pointer">{l}</a>)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="font-mono text-[11px] text-white/20">© 2025 Intent Technologies, Inc.</div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-white/30">
          <div className="w-[6px] h-[6px] rounded-full bg-green-500 animate-blink"></div>
          All systems operational
        </div>
      </div>
    </footer>
  );
}