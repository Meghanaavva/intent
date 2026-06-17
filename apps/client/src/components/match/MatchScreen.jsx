import { ArrowRight, Check } from 'lucide-react';
import { useRoomStore } from '../../store/roomStore.js';

const STATUS_TEXT = {
  matching:    'Finding your person…',
  connecting:  'Intent locked ·',
  matched:     'Matched',
};
const STATUS_COLOR = {
  matching:   'var(--ink)',
  connecting: 'var(--ink)',
  matched:    'var(--green)',
};

export function MatchScreen() {
  const { status, matchedIntent } = useRoomStore();
  const text  = STATUS_TEXT[status]  || 'Connecting…';
  const color = STATUS_COLOR[status] || 'var(--ink)';

  return (
    <div className="flex-1 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-[22px] text-center max-w-[420px] px-10 py-16">

        <div className="font-mono text-[11px] text-[var(--ink4)] tracking-[0.12em] uppercase">
          CONNECTING
        </div>

        {/* Pulse rings */}
        <div className="relative w-[88px] h-[88px] flex items-center justify-center">
          <div className="absolute w-[88px] h-[88px] rounded-full border-2 border-[var(--acc)] animate-ring"></div>
          <div className="absolute w-[88px] h-[88px] rounded-full border-2 border-purple-200 animate-ring" style={{animationDelay:'.35s'}}></div>
          <div className="w-10 h-10 rounded-full bg-[var(--acc)] z-10 flex items-center justify-center text-white">
            <ArrowRight size={18} strokeWidth={2.5}/>
          </div>
        </div>

        <div className="text-[28px] font-black tracking-[-0.04em] transition-colors duration-300 inline-flex items-center gap-2" style={{color}}>
          {text}
          {status==='matched' && <Check size={24} strokeWidth={3}/>}
        </div>

        {matchedIntent && (
          <div className="bg-[var(--bg2)] border-[1.5px] border-[var(--border)] rounded-[10px] px-[18px] py-3 text-[13px] text-[var(--ink2)] italic leading-[1.55] font-medium max-w-[320px]">
            "{matchedIntent.text?.substring(0,80)}{matchedIntent.text?.length > 80 ? '…' : ''}"
          </div>
        )}

      </div>
    </div>
  );
}