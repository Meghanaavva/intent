import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore.js';
import { useUiStore } from '../../store/uiStore.js';

export function Navbar() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { onlineCount } = useUiStore();

  return (
    <nav className="fixed top-0 left-0 right-0 z-[200] h-[62px] flex items-center justify-between px-14 bg-white/95 backdrop-blur-xl border-b border-[var(--border)]">
      <div className="text-[20px] font-black tracking-[-0.05em]">intent<span className="text-[var(--acc)]">.</span></div>
      <div className="flex items-center gap-9">
        <a href="#features" className="text-[13px] font-medium text-[var(--ink3)] hover:text-[var(--ink)] transition-colors cursor-pointer">features</a>
        <a href="#how"      className="text-[13px] font-medium text-[var(--ink3)] hover:text-[var(--ink)] transition-colors cursor-pointer">how it works</a>
        <a href="#manifesto"className="text-[13px] font-medium text-[var(--ink3)] hover:text-[var(--ink)] transition-colors cursor-pointer">manifesto</a>
      </div>
      <button
        onClick={() => navigate(user ? '/app' : '/login')}
        className="bg-[var(--acc)] text-white border-none px-6 py-2 rounded-[8px] text-[13px] font-bold cursor-pointer hover:bg-[var(--acc-d)] transition-colors"
      >
        {user ? 'Open App →' : 'Get started →'}
      </button>
    </nav>
  );
}