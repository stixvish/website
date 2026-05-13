import { useLetterboxd } from "../../hooks/useLetterboxd";
import LetterboxdIcon from "../icons/letterboxd";
import CardFrame, { HexBadge, Row } from "./frame";

const ACCENT = "#00e054";
const STARS_COLOR = "#ff8000";

function formatWatchedDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function Letterboxd() {
  const { data, error } = useLetterboxd();

  const back = data ? (
    <div className="flex h-full flex-col p-4">
      <div className="flex flex-col">
        <Row label="Film">
          <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-base font-bold text-white transition-colors hover:text-[#00e054]"
          >
            {data.title}
          </a>
        </Row>
        <Row label="Year"><span className="text-base font-bold text-white">{data.year}</span></Row>
        <Row label="Watched"><span className="text-base font-bold text-white">{formatWatchedDate(data.watchedAt)}</span></Row>
        <Row label="Rating"><span className="text-base font-bold" style={{ color: STARS_COLOR }}>{data.stars}</span></Row>
      </div>
      {data.review && (
        <div className="mt-4 flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <p className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-gray-500">Review</p>
          <p className="text-sm leading-relaxed text-gray-300">{data.review}</p>
        </div>
      )}
    </div>
  ) : undefined;

  const badge = (
    <HexBadge accentColor={ACCENT}>
      <LetterboxdIcon height={14} width={37} />
    </HexBadge>
  );

  return (
    <CardFrame back={back} badge={badge} series="FILM" backing="linear-gradient(135deg, #ff8000 0%, #e74c3c 40%, #00e054 80%, #ff8000 100%)">
      {error ? (
        <p className="m-auto text-xs text-gray-600">Couldn't load</p>
      ) : data ? (
        <div
          className="relative h-full w-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${data.poster.url}')` }}
        >
          <div
            className="absolute inset-x-0 bottom-0"
            style={{ height: "60%", background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)" }}
          />
          <div className="pointer-events-none absolute inset-y-0 left-3 z-10 flex items-center">
            <p
              className="text-sm font-black leading-none drop-shadow-[0_0_10px_rgba(255,128,0,0.9)]"
              style={{ color: STARS_COLOR, writingMode: "vertical-rl", textOrientation: "mixed" }}
            >
              {data.stars}
            </p>
          </div>
          <div className="absolute inset-x-0 bottom-0 pr-6 pb-6 text-right" style={{ paddingLeft: "calc(10% + 12px)" }}>
            <p className="wrap-break-word text-[10px] font-bold uppercase tracking-widest text-gray-400">
              {data.year}
            </p>
            <p className="wrap-break-word text-2xl font-black uppercase leading-tight tracking-tight">
              {data.title}
            </p>
          </div>
        </div>
      ) : null}
    </CardFrame>
  );
}
