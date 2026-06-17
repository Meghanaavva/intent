import { Flame, User, Globe, Hourglass, X } from 'lucide-react';
import { useUiStore } from '../../store/uiStore.js';

export function BentoFeatures() {
  const { openApp } = useUiStore();
  return (
    <section className="py-24 px-14 bg-[var(--bg2)]" id="features">
      <div className="text-center max-w-[580px] mx-auto mb-14">
        <div className="font-mono text-[11px] text-[var(--acc)] tracking-[0.16em] uppercase mb-3">// FEATURES</div>
        <h2 className="text-[44px] font-black tracking-[-0.04em] leading-[1.06]">
          Everything you need.<br/><span className="text-[var(--acc)]">Nothing you don't.</span>
        </h2>
        <p className="text-[16px] text-[var(--ink3)] leading-[1.72] mt-3">
          Built from scratch for the moment when an idea hits and you need someone right now.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-3.5 max-w-[1100px] mx-auto">
        {/* Big card - Live feed */}
        <div className="col-span-5 bg-white border-[1.5px] border-[var(--border)] rounded-[18px] p-7 hover:border-[var(--border2)] hover:-translate-y-0.5 transition-all">
          <div className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-2.5 py-1 text-[11px] font-semibold text-green-600 mb-3">
            <div className="w-[6px] h-[6px] rounded-full bg-green-500 animate-blink"></div>
            Live right now
          </div>
          <div className="font-mono text-[10px] text-[var(--ink4)] tracking-[0.1em] mb-1.5">// CORE FEATURE</div>
          <div className="text-[17px] font-extrabold tracking-[-0.03em] mb-1.5">Real-time intent feed</div>
          <div className="text-[13px] text-[var(--ink3)] leading-[1.65] mb-4">Every post appears instantly. No algorithm. Pure chronological stream of human intent.</div>
          <div className="flex flex-col gap-1.5">
            {["I want to build a no-code AI workflow tool","Planning a solo trip to Ladakh in October","Looking to jam on lo-fi beats tonight"].map((t,i)=>(
              <div key={i} className="bg-[var(--bg2)] border border-[var(--border)] rounded-[9px] p-2 flex items-center gap-2.5">
                <span className="text-[11px] font-semibold flex-1 truncate">{t}</span>
                <button onClick={openApp} className="bg-[var(--acc)] text-white border-none px-2.5 py-[3px] rounded-[5px] text-[10px] font-bold cursor-pointer">Join</button>
              </div>
            ))}
          </div>
        </div>

        {/* Atomic matching */}
        <div className="col-span-4 bg-[var(--acc)] border-[1.5px] border-[var(--acc)] rounded-[18px] p-7 hover:-translate-y-0.5 transition-all">
          <div className="font-mono text-[10px] text-white/50 tracking-[0.1em] mb-1.5">// MATCHING ENGINE</div>
          <div className="text-[64px] font-black leading-[1] tracking-[-0.05em] text-white/20 mb-2">01</div>
          <div className="text-[17px] font-extrabold tracking-[-0.03em] text-white mb-1.5">Atomic matching</div>
          <div className="text-[13px] text-white/80 leading-[1.65]">First click wins. Race-condition safe. Redis-backed locks. Click Join — you're instantly in.</div>
        </div>

        {/* Ephemeral */}
        <div className="col-span-3 bg-white border-[1.5px] border-[var(--border)] rounded-[18px] p-7 hover:border-[var(--border2)] hover:-translate-y-0.5 transition-all">
          <div className="w-[42px] h-[42px] rounded-[11px] bg-[var(--ink)] flex items-center justify-center mb-4"><Flame size={20} className="text-white" strokeWidth={2.25}/></div>
          <div className="font-mono text-[10px] text-[var(--ink4)] tracking-[0.1em] mb-1.5">// PRIVACY</div>
          <div className="text-[17px] font-extrabold tracking-[-0.03em] mb-1.5">Ephemeral by design</div>
          <div className="text-[13px] text-[var(--ink3)] leading-[1.65]">Nothing stored. Session ends, it disappears forever.</div>
        </div>

        {/* Identity */}
        <div className="col-span-6 bg-white border-[1.5px] border-[var(--border)] rounded-[18px] p-7 hover:border-[var(--border2)] hover:-translate-y-0.5 transition-all">
          <div className="w-[42px] h-[42px] rounded-[11px] bg-[var(--acc-l)] flex items-center justify-center mb-4"><User size={20} className="text-[var(--acc)]" strokeWidth={2.25}/></div>
          <div className="font-mono text-[10px] text-[var(--ink4)] tracking-[0.1em] mb-1.5">// IDENTITY</div>
          <div className="text-[17px] font-extrabold tracking-[-0.03em] mb-1.5">Zero identity pressure</div>
          <div className="text-[13px] text-[var(--ink3)] leading-[1.65]">
            You're <code className="font-mono text-[12px] text-[var(--acc)] font-semibold bg-[var(--acc-l)] px-1.5 py-0.5 rounded">CrimsonFox_2841</code>. New session, new identity. No reputation. No social weight.
          </div>
        </div>

        {/* Moderation */}
        <div className="col-span-6 bg-[var(--ink)] border-[1.5px] border-[var(--ink)] rounded-[18px] p-7 hover:-translate-y-0.5 transition-all">
          <div className="font-mono text-[10px] text-white/30 tracking-[0.1em] mb-1.5">// MODERATION</div>
          <div className="text-[17px] font-extrabold tracking-[-0.03em] text-white mb-1.5">AI safety layer</div>
          <div className="text-[13px] text-white/55 leading-[1.65] mb-4">Pre-publish check ~200ms. Hate speech, spam, scams — blocked before the feed.</div>
          <div className="flex gap-2 flex-wrap">
            {['hate speech','spam','scams'].map(t=>(
              <span key={t} className="bg-white/7 border border-white/10 text-white/50 px-2.5 py-1 rounded-[6px] font-mono text-[10px] inline-flex items-center gap-1">{t} <X size={10} strokeWidth={2.5}/></span>
            ))}
          </div>
        </div>

        {/* TTL */}
        <div className="col-span-4 bg-white border-[1.5px] border-[var(--border)] rounded-[18px] p-7 hover:border-[var(--border2)] hover:-translate-y-0.5 transition-all">
          <div className="w-[42px] h-[42px] rounded-[11px] bg-[var(--acc-l)] flex items-center justify-center mb-4"><Hourglass size={20} className="text-[var(--acc)]" strokeWidth={2.25}/></div>
          <div className="font-mono text-[10px] text-[var(--ink4)] tracking-[0.1em] mb-1.5">// TTL SYSTEM</div>
          <div className="text-[17px] font-extrabold tracking-[-0.03em] mb-1.5">Posts self-destruct</div>
          <div className="text-[13px] text-[var(--ink3)] leading-[1.65]">3-hour lifetime. MongoDB TTL indexes. Feed always alive, never stale.</div>
        </div>

        {/* Categories */}
        <div className="col-span-4 bg-white border-[1.5px] border-[var(--border)] rounded-[18px] p-7 hover:border-[var(--border2)] hover:-translate-y-0.5 transition-all">
          <div className="text-[52px] font-black leading-[1] tracking-[-0.05em] text-green-500 mb-2">∞</div>
          <div className="font-mono text-[10px] text-[var(--ink4)] tracking-[0.1em] mb-1.5">// CATEGORIES</div>
          <div className="text-[17px] font-extrabold tracking-[-0.03em] mb-1.5">Every type of intent</div>
          <div className="text-[13px] text-[var(--ink3)] leading-[1.65]">Code, trips, music, art, food, fitness — anyone, anything, anytime.</div>
        </div>

        {/* Presence */}
        <div className="col-span-4 bg-white border-[1.5px] border-[var(--border)] rounded-[18px] p-7 hover:border-[var(--border2)] hover:-translate-y-0.5 transition-all">
          <div className="w-[42px] h-[42px] rounded-[11px] bg-green-50 flex items-center justify-center mb-4"><Globe size={20} className="text-green-600" strokeWidth={2.25}/></div>
          <div className="font-mono text-[10px] text-[var(--ink4)] tracking-[0.1em] mb-1.5">// PRESENCE</div>
          <div className="text-[17px] font-extrabold tracking-[-0.03em] mb-1.5">Live presence counter</div>
          <div className="text-[13px] text-[var(--ink3)] leading-[1.65]">Real-time heartbeat. Always know the room is alive and buzzing.</div>
        </div>
      </div>
    </section>
  );
}