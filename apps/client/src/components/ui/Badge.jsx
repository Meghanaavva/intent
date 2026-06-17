const colorMap = {
  building:'bg-[var(--acc-l)] text-[var(--acc)]',
  urgent:'bg-red-50 text-red-500',
  casual:'bg-green-50 text-green-600',
  exploring:'bg-purple-50 text-purple-700',
  trips:'bg-amber-50 text-amber-600',
  music:'bg-teal-50 text-teal-600',
};
export function Badge({ label }) {
  return (
    <span className={`font-mono text-[9px] font-medium px-[7px] py-[2px] rounded-[4px] ${colorMap[label]||'bg-gray-100 text-gray-500'}`}>
      {label}
    </span>
  );
}