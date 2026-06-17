import { useState, useRef, useEffect } from 'react';
import { CATEGORIES } from '../../lib/constants.js';
import { useFeedStore } from '../../store/feedStore.js';

export function CategoryBar() {
  const { category, setCategory } = useFeedStore();
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef(null);

  const primary = CATEGORIES.filter(c => c.primary);
  const more    = CATEGORIES.filter(c => !c.primary);

  // Close on outside click
  useEffect(() => {
    function handle(e) {
      if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false);
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  const pill = (c) => (
    <button key={c.id}
      onClick={() => { setCategory(c.id); setMoreOpen(false); }}
      className={`border-[1.5px] px-3.5 py-[5px] rounded-full text-[11px] font-semibold cursor-pointer whitespace-nowrap transition-all flex-shrink-0 font-sans ${
        category === c.id
          ? 'bg-[var(--acc)] border-[var(--acc)] text-white'
          : 'bg-transparent border-[var(--border)] text-[var(--ink3)] hover:border-[var(--border2)] hover:text-[var(--ink)]'
      }`}>
      {c.label}
    </button>
  );

  return (
    <div className="flex justify-center px-14 py-2.5 border-b border-[var(--border)] bg-[var(--bg2)] flex-shrink-0">
      <div className="flex items-center gap-1.5 w-full max-w-[1100px]">
        <div className="flex gap-[5px] flex-1 overflow-x-auto scrollbar-none">
          {primary.map(pill)}
        </div>

        {/* More dropdown - opens LEFT-aligned so it stays near the button */}
        <div className="relative flex-shrink-0" ref={moreRef}>
          <button
            onClick={() => setMoreOpen(!moreOpen)}
            className={`border-[1.5px] px-3 py-[5px] rounded-full text-[11px] font-semibold cursor-pointer transition-all font-sans ${
              moreOpen
                ? 'bg-[var(--acc-l)] border-[var(--acc)] text-[var(--acc)]'
                : 'bg-transparent border-[var(--border)] text-[var(--ink3)] hover:border-[var(--border2)]'
            }`}>
            More ▾
          </button>
          {moreOpen && (
            <div className="absolute top-[calc(100%+8px)] right-0 bg-white border-[1.5px] border-[var(--border)] rounded-[14px] p-2.5 z-50 flex flex-wrap gap-[5px] w-[280px] shadow-xl">
              {more.map(pill)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}