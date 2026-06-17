import { PenLine, Eye, Zap, MessageCircle, ArrowRight } from 'lucide-react';

const steps=[
  {n:'01',icon:PenLine,t:'Post your intent',d:'One line. No login. You get an anonymous ID like SilentFox_4821.'},
  {n:'02',icon:Eye,t:'Browse live feed',d:'See every active intent from people online right now. Filter by category.',active:true},
  {n:'03',icon:Zap,t:'Click Join Flow',d:'Atomic match. First click wins. Instantly connected — no approval needed.'},
  {n:'04',icon:MessageCircle,t:'Build together',d:'Ephemeral private room. Nothing stored. Share contact if it clicks.'},
];
export function HowItWorks() {
  return (
    <section className="py-24 px-14" id="how">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center max-w-[520px] mx-auto mb-12">
          <div className="font-mono text-[11px] text-[var(--acc)] tracking-[0.16em] uppercase mb-3">// HOW IT WORKS</div>
          <h2 className="text-[44px] font-black tracking-[-0.04em] leading-[1.06]">Four steps.<br/><span className="text-[var(--acc)]">Under 30 seconds.</span></h2>
        </div>
        <div className="grid grid-cols-4 border-[1.5px] border-[var(--border)] rounded-[20px] overflow-hidden">
          {steps.map((s,i)=>{
            const Icon = s.icon;
            return (
            <div key={i} className={`p-[30px] ${i<3?'border-r border-[var(--border)]':''} relative ${s.active?'bg-[var(--acc)]':''}`}>
              <div className={`font-mono text-[11px] mb-5 ${s.active?'text-white/55':'text-[var(--ink4)]'}`}>STEP {s.n}</div>
              <div className="mb-3"><Icon size={26} className={s.active?'text-white':'text-[var(--ink)]'} strokeWidth={2}/></div>
              <div className={`text-[16px] font-extrabold tracking-[-0.03em] mb-2 ${s.active?'text-white':'text-[var(--ink)]'}`}>{s.t}</div>
              <div className={`text-[12px] leading-[1.65] ${s.active?'text-white/78':'text-[var(--ink3)]'}`}>{s.d}</div>
              {i<3 && <div className="absolute right-[-13px] top-1/2 -translate-y-1/2 w-[24px] h-[24px] bg-[var(--acc)] rounded-full flex items-center justify-center z-10 text-white"><ArrowRight size={12} strokeWidth={2.5}/></div>}
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}