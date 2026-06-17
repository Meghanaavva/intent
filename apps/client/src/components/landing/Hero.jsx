import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore.js';
import { useUiStore } from '../../store/uiStore.js';

export function Hero() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { onlineCount } = useUiStore();

  function handleEnterFlow() {
    navigate(user ? '/app' : '/login');
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-14 pt-[100px] pb-20 relative overflow-hidden text-center">
      <div className="absolute inset-0 opacity-50" style={{backgroundImage:'linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px)',backgroundSize:'56px 56px',maskImage:'radial-gradient(ellipse 80% 70% at 50% 50%,black 20%,transparent 80%)'}}></div>
      <div className="relative z-10 max-w-[820px]">
        <div className="inline-flex items-center gap-2 bg-[var(--acc-l)] border border-purple-200 rounded-full px-4 py-[5px] mb-8 animate-fadeUp">
          <div className="w-5 h-5 rounded-full bg-[var(--acc)] flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-white"></div></div>
          <span className="text-[12px] font-semibold text-[var(--acc)]">LIVE · <span id="hero-count">{onlineCount}</span> people online right now</span>
        </div>
        <h1 className="text-[82px] font-black leading-[0.94] tracking-[-0.055em] mb-6 animate-fadeUp" style={{animationDelay:'.1s'}}>
          Stop waiting.<br/>Find your person<br/><span className="text-[var(--acc)]">right now.</span>
        </h1>
        <p className="text-[18px] text-[var(--ink3)] leading-[1.7] max-w-[440px] mx-auto mb-11 font-normal animate-fadeUp" style={{animationDelay:'.2s'}}>
          Post one line. Get matched instantly. No profiles. No noise. Just intent.
        </p>
        <div className="flex gap-3 justify-center animate-fadeUp" style={{animationDelay:'.3s'}}>
          <button onClick={handleEnterFlow} className="bg-[var(--acc)] text-white border-none px-10 py-4 rounded-[10px] text-[16px] font-bold cursor-pointer hover:bg-[var(--acc-d)] hover:-translate-y-px transition-all inline-flex items-center gap-2">
            Enter the Flow <span>→</span>
          </button>
          <button onClick={()=>document.getElementById('how')?.scrollIntoView({behavior:'smooth'})} className="bg-transparent border-[1.5px] border-[var(--border2)] text-[var(--ink2)] px-7 py-[15px] rounded-[10px] text-[15px] font-semibold cursor-pointer hover:border-[var(--ink)] hover:text-[var(--ink)] transition-all">
            See how it works
          </button>
        </div>
        <div className="mt-12 flex items-center gap-6 justify-center animate-fadeUp" style={{animationDelay:'.4s'}}>
          {[['','54','online now',true],[null,'~40s','avg match',false],[null,'0','profiles required',false],[null,'843+','on waitlist',false]].map(([dot,num,lbl,green],i)=>(
            <div key={i} className="flex items-center gap-2 text-[12px] font-medium text-[var(--ink3)]">
              {green && <div className="w-[6px] h-[6px] rounded-full bg-[var(--green)]"></div>}
              <b className="font-bold text-[var(--ink)]">{num}</b>&nbsp;{lbl}
              {i<3 && <div className="w-px h-[18px] bg-[var(--border)] ml-4"></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}