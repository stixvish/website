export default function Spinner({
  size = 48,
  logo,
}: {
  size?: number;
  logo?: React.ReactNode;
}) {
  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        style={{ animation: "spin 1.2s linear infinite", position: "absolute" }}
      >
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="currentColor"
          strokeOpacity={0.15}
          strokeWidth="3"
        />
        <path
          d="M24 4 A20 20 0 0 1 44 24"
          stroke="#00e054"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      {logo && <div style={{ position: "relative", zIndex: 1 }}>{logo}</div>}
    </div>
  );
}
