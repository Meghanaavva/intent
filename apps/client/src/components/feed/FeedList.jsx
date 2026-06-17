import { ArrowUp } from 'lucide-react';
import { useFeedStore } from '../../store/feedStore.js';
import { IntentCard } from './IntentCard.jsx';
export function FeedList() {
  const { intents, category } = useFeedStore();
  const filtered = category==='all' ? intents : intents.filter(i=>i.category===category||i.vibe===category);
  if(!filtered.length) return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center font-mono text-[11px] text-[var(--ink4)] leading-[1.9] flex flex-col items-center gap-1">
        <span>No active intents in this category.</span>
        <span className="inline-flex items-center gap-1">Be the first to post one <ArrowUp size={12} strokeWidth={2.5}/></span>
      </div>
    </div>
  );
  return (
    <div className="flex-1 overflow-y-auto flex justify-center px-14 py-4">
      <div className="w-full max-w-[1100px] flex flex-col gap-2.5">
        {filtered.map((intent,i)=><IntentCard key={intent._id} intent={intent} delay={i*0.04}/>)}
      </div>
    </div>
  );
}