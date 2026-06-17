export function Spinner({ size = 24 }) {
  return (
    <div
      className="animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--acc)]"
      style={{ width: size, height: size }}
    />
  );
}