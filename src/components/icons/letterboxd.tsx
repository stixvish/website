export default function Letterboxd({
  height = 14,
  width = "100%",
}: {
  height?: number | string;
  width?: number | string;
}) {
  const h = typeof height === "string" ? 14 : height;
  const r = h / 2;
  const overlap = h * 0.15;
  const cy = h / 2;
  const x1 = r;
  const x2 = x1 + r * 2 - overlap;
  const x3 = x2 + r * 2 - overlap;
  const totalWidth = x3 + r;

  return (
    <svg
      width={width}
      viewBox={`0 0 ${totalWidth} ${h}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <circle cx={x1} cy={cy} r={r} fill="#ff8000" />
      <circle cx={x2} cy={cy} r={r} fill="#00e054" />
      <circle cx={x3} cy={cy} r={r} fill="#40bcf4" />
    </svg>
  );
}
