import { useGaming } from "../../hooks/useGaming";
import Xbox from "../icons/xbox";
import Steam from "../icons/steam";
import CardFrame, { HexBadge, Row } from "./frame";

const PLATFORM_COLORS: Record<string, string> = {
  xbox: "#107C10",
  steam: "#c3c3c3",
  playstation: "#003791",
};

const LIVE_COLOR = "#4ade80";

function timeAgo(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const minutes = Math.floor(diff / 60_000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  return `${minutes}m ago`;
}

function formatPlaytime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export default function Gaming() {
  const { data, error } = useGaming();
  const platform = data?.platform.toLowerCase();
  const accent = platform ? (PLATFORM_COLORS[platform] ?? "#ffffff") : "#333333";

  const PlatformIcon =
    platform === "steam" ? (
      <Steam size={20} fill={accent} />
    ) : platform === "xbox" ? (
      <Xbox size={24} fill={accent} />
    ) : null;

  const back = data ? (
    <div className="flex h-full flex-col p-4">
      <div className="flex flex-col">
        <Row label="Game"><span className="text-base font-bold text-white">{data.game}</span></Row>
        <Row label="Platform"><span className="text-sm font-bold text-white uppercase">{data.platform}</span></Row>
        {data.status && (
          <Row label="Rich presence"><span className="text-base font-bold text-white">{data.status}</span></Row>
        )}
        <Row label="Playtime"><span className="text-base font-bold text-white">{formatPlaytime(data.playtimeMinutes)}</span></Row>
        <Row label="Status">
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-base font-bold" style={{ color: data.isPlaying ? LIVE_COLOR : "#6b7280" }}>
              {data.isPlaying ? "● Online" : "Offline"}
            </span>
            {!data.isPlaying && <span className="text-xs text-gray-500">last seen {timeAgo(data.lastPlayedAt)}</span>}
          </div>
        </Row>
      </div>
      <div className="mt-auto flex items-center gap-2 opacity-20">{PlatformIcon}</div>
    </div>
  ) : undefined;

  const backing = platform === "steam"
    ? "linear-gradient(135deg, #c3c3c3 0%, #6b7280 35%, #1b2838 70%, #c3c3c3 100%)"
    : platform === "xbox"
    ? "linear-gradient(135deg, #107C10 0%, #1a9e1a 40%, #052e05 70%, #107C10 100%)"
    : "linear-gradient(135deg, #d4af37 0%, #ffd700 40%, #f7971e 70%, #d4af37 100%)";

  const badge = <HexBadge accentColor={accent}>{PlatformIcon}</HexBadge>;

  return (
    <CardFrame back={back} badge={badge} series="GAMING" backing={backing}>
      {error ? (
        <p className="m-auto text-xs text-gray-600">Couldn't load</p>
      ) : data ? (
        <div
          className="relative h-full w-full bg-cover bg-center bg-no-repeat"
          style={
            data.cover.url
              ? { backgroundImage: `url('${data.cover.url}')` }
              : { background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)" }
          }
        >
          <div
            className="absolute inset-x-0 bottom-0"
            style={{ height: "60%", background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)" }}
          />
          {data.isPlaying && (
            <div className="pointer-events-none absolute inset-y-0 left-3 z-10 flex items-center">
              <p
                className="text-[9px] font-black uppercase tracking-[0.2em] drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]"
                style={{ color: LIVE_COLOR, writingMode: "vertical-rl", textOrientation: "mixed" }}
              >
                ● Live
              </p>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 pr-6 pb-6 text-right" style={{ paddingLeft: "calc(10% + 12px)" }}>
            <p className="wrap-break-word text-[10px] font-bold uppercase tracking-widest" style={{ color: accent }}>
              {data.platform} · {formatPlaytime(data.playtimeMinutes)}
            </p>
            <p className="wrap-break-word text-2xl font-black uppercase leading-tight tracking-tight">
              {data.game}
            </p>
          </div>
        </div>
      ) : null}
    </CardFrame>
  );
}
