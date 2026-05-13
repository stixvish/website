import { useGaming } from "../../hooks/useGaming";
import Xbox from "../icons/xbox";
import Steam from "../icons/steam";
import CardFrame, { HexBadge, Row } from "./frame";

const PLATFORM_COLORS: Record<string, string> = {
  xbox: "#107C10",
  steam: "#c3c3c3",
  playstation: "#003791",
};

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
  const { data, error, loading } = useGaming();
  const accent = data ? (PLATFORM_COLORS[data.platform] ?? "#ffffff") : "#333333";

  const PlatformIcon = data?.platform === "steam"
    ? <Steam size={20} fill={accent} />
    : data?.platform === "xbox"
    ? <Xbox size={24} fill={accent} />
    : null;

  const back = data ? (
    <div className="flex h-full flex-col p-4">
      <div className="flex flex-col">
        <Row label="Game"><span className="text-sm font-bold text-white">{data.game}</span></Row>
        <Row label="Platform"><span className="text-sm font-bold text-white">{data.platform}</span></Row>
        <Row label="Playtime"><span className="text-sm font-bold text-white">{formatPlaytime(data.playtimeMinutes)}</span></Row>
        <Row label="Last session">
          <span className="text-sm font-bold text-white">
            {data.isPlaying ? "● Playing now" : timeAgo(data.lastPlayedAt)}
          </span>
        </Row>
      </div>
      <div className="mt-auto flex items-center gap-2 opacity-20">{PlatformIcon}</div>
    </div>
  ) : undefined;

  const badge = <HexBadge accentColor={accent}>{PlatformIcon}</HexBadge>;

  return (
    <CardFrame back={back} badge={badge} series="GAMING" backing="linear-gradient(135deg, #d4af37 0%, #ffd700 40%, #f7971e 70%, #d4af37 100%)">
      {loading ? (
        <p className="m-auto text-sm text-gray-400">Loading...</p>
      ) : error ? (
        <p className="m-auto text-sm text-gray-400">Error loading gaming data.</p>
      ) : data ? (
        <div
          className="relative h-full w-full bg-cover bg-center bg-no-repeat"
          style={
            data.cover.url
              ? { backgroundImage: `url('${data.cover.url}')` }
              : { background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)" }
          }
        >
          {/* bottom gradient */}
          <div
            className="absolute inset-x-0 bottom-0"
            style={{ height: "60%", background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)" }}
          />

          {/* nameplate overlay */}
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
