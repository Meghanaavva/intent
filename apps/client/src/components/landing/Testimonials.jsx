import { Star } from 'lucide-react';

const testimonials=[
  {q:'"I posted at 2am about a SaaS idea. Was matched in 40 seconds. We\'ve been building together for 3 months now."',initials:'AK',name:'Aryan K.',role:'indie hacker · Bangalore',color:'bg-purple-100 text-purple-500'},
  {q:'"The anonymity is the point. No LinkedIn energy. No reputation games. Just two people making something real."',initials:'SM',name:'Sara M.',role:'product designer · Berlin',color:'bg-green-100 text-green-600'},
  {q:'"Feels like the early internet. Raw, fast, real. Nothing else gives me this feeling anymore."',initials:'DV',name:'Dev V.',role:'full-stack dev · Mumbai',color:'bg-red-100 text-red-400'},
];
export function Testimonials() {
  return (
    <section className="py-24 px-14 bg-[var(--ink)]">
      <div className="max-w-[1100px] mx-auto">
        <h2 className="text-[44px] font-black tracking-[-0.04em] text-white mb-12">Real people.<br/><span className="text-purple-400">Real moments.</span></h2>
        <div className="grid grid-cols-3 gap-3.5">
          {testimonials.map((t,i)=>(
            <div key={i} className="bg-white/5 border border-white/[0.08] rounded-[16px] p-6 hover:border-white/[0.14] transition-colors">
              <div className="flex gap-0.5 text-purple-400 mb-3">
                {Array.from({length:5}).map((_,j)=><Star key={j} size={13} fill="currentColor" strokeWidth={0}/>)}
              </div>
              <p className="text-[14px] text-white/70 leading-[1.7] mb-5 italic">{t.q}</p>
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-extrabold ${t.color}`}>{t.initials}</div>
                <div><div className="text-[12px] font-bold text-white">{t.name}</div><div className="font-mono text-[9px] text-white/30">{t.role}</div></div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-3.5 mt-12 pt-12 border-t border-white/[0.08]">
          {[['~40s','avg time to match'],['843+','builders waiting'],['0','profiles required'],['3hr','max post lifetime']].map(([v,l])=>(
            <div key={l}><div className="text-[40px] font-black tracking-[-0.04em] text-white mb-1">{v}</div><div className="font-mono text-[10px] text-white/30">{l}</div></div>
          ))}
        </div>
      </div>
    </section>
  );
}
