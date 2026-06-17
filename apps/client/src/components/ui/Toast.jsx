import { useUiStore } from '../../store/uiStore.js';
export function Toast() {
  const toast = useUiStore(s => s.toast);
  return (
    <div className={`fixed bottom-7 left-1/2 -translate-x-1/2 bg-[var(--ink)] text-white px-5 py-3 rounded-[10px] text-[13px] font-medium transition-all duration-300 z-[999] whitespace-nowrap pointer-events-none ${toast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {toast}
    </div>
  );
}