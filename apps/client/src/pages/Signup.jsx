import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore.js';

export function Signup() {
  const navigate = useNavigate();
  const { signup, error, clearError } = useAuthStore();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    clearError();
    setLoading(true);
    const result = await signup(email, password, username);
    setLoading(false);
    if (result === 'signup_ok') navigate('/login?welcome=1');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg2)] px-4">
      <div className="w-full max-w-[400px] bg-white border-[1.5px] border-[var(--border)] rounded-[14px] p-8">
        <div className="text-[20px] font-black tracking-[-0.05em] mb-1">
          intent<span className="text-[var(--acc)]">.</span>
        </div>
        <h1 className="text-[15px] font-bold text-[var(--ink2)] mb-6">Create your account</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-[var(--ink3)] mb-1.5">Username</label>
            <input
              type="text" required minLength={3} maxLength={20} value={username} onChange={e=>setUsername(e.target.value)}
              className="w-full border-[1.5px] border-[var(--border)] rounded-[8px] px-3 py-2.5 text-[14px] outline-none focus:border-[var(--acc)] transition-colors"
              placeholder="yourname"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-[var(--ink3)] mb-1.5">Email</label>
            <input
              type="email" required value={email} onChange={e=>setEmail(e.target.value)}
              className="w-full border-[1.5px] border-[var(--border)] rounded-[8px] px-3 py-2.5 text-[14px] outline-none focus:border-[var(--acc)] transition-colors"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-[var(--ink3)] mb-1.5">Password</label>
            <input
              type="password" required minLength={6} value={password} onChange={e=>setPassword(e.target.value)}
              className="w-full border-[1.5px] border-[var(--border)] rounded-[8px] px-3 py-2.5 text-[14px] outline-none focus:border-[var(--acc)] transition-colors"
              placeholder="At least 6 characters"
            />
          </div>

          {error && <div className="text-[12px] text-[var(--red)] font-medium">{error}</div>}

          <button type="submit" disabled={loading}
            className="bg-[var(--acc)] text-white border-none px-6 py-2.5 rounded-[8px] text-[13px] font-bold cursor-pointer hover:bg-[var(--acc-d)] transition-colors disabled:opacity-60 mt-1">
            {loading ? 'Creating account…' : 'Sign up'}
          </button>
        </form>

        <div className="text-[12px] text-[var(--ink3)] mt-5 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-[var(--acc)] font-semibold hover:underline">Log in</Link>
        </div>
        <div className="text-[12px] text-[var(--ink3)] mt-2 text-center">
          <Link to="/" className="hover:underline">← Back to home</Link>
        </div>
      </div>
    </div>
  );
}