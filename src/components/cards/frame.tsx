import { useRef, useState, useEffect } from "react";

const R = 6;
const NW_PCT = 0.10; // notch width as fraction of card width
const NH_PCT = 0.40; // notch height as fraction of card height
const CR = 12;       // inner corner radius in px

function makeFrontPath(w: number, h: number) {
  const nw = w * NW_PCT;
  const nh = h * NH_PCT;
  // Clockwise from top-left. Inner corners of each notch are rounded with Q beziers.
  return [
    `M 0 0`,
    `L ${w - nw} 0`,
    `L ${w - nw} ${nh - CR}`,
    `Q ${w - nw} ${nh} ${w - nw + CR} ${nh}`,  // TR notch inner corner
    `L ${w} ${nh}`,
    `L ${w} ${h}`,
    `L ${nw} ${h}`,
    `L ${nw} ${h - nh + CR}`,
    `Q ${nw} ${h - nh} ${nw - CR} ${h - nh}`,  // BL notch inner corner
    `L 0 ${h - nh}`,
    `L 0 0 Z`,
  ].join(" ");
}

export function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] py-2.5">
      <span className="shrink-0 text-[9px] font-bold tracking-[0.18em] text-gray-500 uppercase">
        {label}
      </span>
      <div className="min-w-0 text-right">{children}</div>
    </div>
  );
}

export function HexBadge({
  children,
  accentColor,
}: {
  children: React.ReactNode;
  accentColor: string;
}) {
  return (
    <div className="relative flex h-14 w-12.5 shrink-0 items-center justify-center">
      <svg
        viewBox="0 0 44 50"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        <polygon
          points="22,2 42,14 42,36 22,48 2,36 2,14"
          fill="rgba(0,0,0,0.92)"
          stroke={accentColor}
          strokeWidth="2.5"
        />
      </svg>
      <div className="relative z-10 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

export default function CardFrame({
  children,
  back,
  badge,
  series,
  backing,
}: {
  children: React.ReactNode;
  back?: React.ReactNode;
  badge?: React.ReactNode;
  series?: string;
  backing?: string;
}) {
  const tiltRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);
  const [cardSize, setCardSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = tiltRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setCardSize({
        w: Math.round(entry.contentRect.width),
        h: Math.round(entry.contentRect.height),
      });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const frontPath = cardSize.w > 0 ? makeFrontPath(cardSize.w, cardSize.h) : null;

  const backingBg =
    backing ??
    "linear-gradient(135deg, #c084fc, #818cf8, #38bdf8, #34d399, #fbbf24, #f87171)";

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (flipped) return;
    const el = tiltRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    el.style.transition = "none";
    el.style.transform = `perspective(800px) rotateX(${(0.5 - y) * 14}deg) rotateY(${(x - 0.5) * 14}deg) scale3d(1.02, 1.02, 1.02)`;
  }

  function onMouseLeave() {
    const el = tiltRef.current;
    if (!el) return;
    el.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
    el.style.transform = "";
  }

  return (
    <div className="aspect-2.5/3.5 w-[min(75vw,320px)] shrink-0 snap-start will-change-transform xl:w-[clamp(200px,35dvw,350px)]">
      <div
        ref={tiltRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={() => setFlipped((f) => !f)}
        className="relative h-full w-full cursor-pointer"
      >
        <div
          className="relative h-full w-full"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Front backing card — slightly smaller, visible on front only */}
          <div
            className="absolute"
            style={{
              inset: "8px",
              borderRadius: `${R}px`,
              background: backingBg,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          />

          {/* Front face — outer div rounds corners, inner div clips to shape */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              borderRadius: `${R}px`,
            }}
          >
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: frontPath ? `path('${frontPath}')` : undefined }}
            >
              {children}
              {series && (
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <span
                    className="text-[8px] font-bold tracking-[0.25em] text-white/55 uppercase"
                    style={{
                      writingMode: "vertical-rl",
                      textOrientation: "mixed",
                    }}
                  >
                    {series}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Back face — solid rectangle, no notches, no text clipping issues */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              borderRadius: `${R}px`,
              background: "linear-gradient(160deg, #1c1c1c 0%, #0a0a0a 100%)",
            }}
          >
            <div className="h-full w-full overflow-x-hidden overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {back ?? (
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-gray-500">Tap to flip back</p>
                </div>
              )}
            </div>
          </div>

          {/* Badge — sits inside card top-left, floats above surface in 3D */}
          {badge && (
            <div
              className="pointer-events-none absolute"
              style={{
                top: "10px",
                left: "10px",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "translateZ(24px)",
                filter: "drop-shadow(4px 4px 10px rgba(0,0,0,0.9))",
              }}
            >
              {badge}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
