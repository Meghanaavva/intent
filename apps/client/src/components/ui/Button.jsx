export function Button({ children, variant='primary', className='', ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 font-bold cursor-pointer transition-all font-sans rounded-[10px] ';
  const variants = {
    primary: 'bg-[var(--acc)] text-white border-none px-10 py-4 text-base hover:bg-[var(--acc-d)] hover:-translate-y-px',
    ghost:   'bg-transparent border-[1.5px] border-[var(--border2)] text-[var(--ink2)] px-7 py-[15px] text-[15px] hover:border-[var(--ink)] hover:text-[var(--ink)]',
    small:   'bg-[var(--acc)] text-white border-none px-6 py-2 text-sm hover:bg-[var(--acc-d)]',
    danger:  'bg-transparent border-[1.5px] border-[var(--border)] text-[var(--ink2)] px-4 py-[6px] text-xs hover:border-red-400 hover:text-red-400',
  };
  return <button className={base + (variants[variant]||'') + ' ' + className} {...props}>{children}</button>;
}
