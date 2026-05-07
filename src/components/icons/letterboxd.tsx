export default function Letterboxd({ size = 14 }: { size?: number }) {
  const r = size / 2;
  const overlap = size * 0.15;
  const cy = size / 2;
  const x1 = r;
  const x2 = x1 + r * 2 - overlap;
  const x3 = x2 + r * 2 - overlap;
  const totalWidth = x3 + r;

  return (
    <svg width={totalWidth} height={size} viewBox={`0 0 ${totalWidth} ${size}`}>
      <circle cx={x1} cy={cy} r={r} fill="#ff8000" />
      <circle cx={x2} cy={cy} r={r} fill="#00e054" />
      <circle cx={x3} cy={cy} r={r} fill="#40bcf4" />
    </svg>
  );
}
