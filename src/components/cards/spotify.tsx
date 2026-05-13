import { useEffect, useState } from "react";
import { useSpotify } from "../../hooks/useSpotify";
import SpotifyIcon from "../icons/spotify";
import CardFrame, { HexBadge, Row } from "./frame";

const ACCENT = "#1db954";

function formatMs(ms: number) {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

function Link({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="text-sm font-bold text-white transition-colors hover:text-[#1db954]"
    >
      {children}
    </a>
  );
}

export default function Spotify() {
  const { data, error, loading } = useSpotify();
  const [positionMs, setPositionMs] = useState(0);

  useEffect(() => {
    if (!data?.progress) {
      setPositionMs(0);
      return;
    }
    const { positionMs: startMs, durationMs, timestamp } = data.progress;
    if (!data.isPlaying) {
      setPositionMs(startMs);
      return;
    }
    let raf: number;
    function tick() {
      const current = Math.min(startMs + (Date.now() - timestamp), durationMs);
      setPositionMs(current);
      if (current < durationMs) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [data]);

  const progressPct = data?.progress
    ? (positionMs / data.progress.durationMs) * 100
    : 0;

  const back = data ? (
    <div className="flex h-full flex-col">
      {/* Rows */}
      <div className="flex flex-1 flex-col p-4">
        {data.context && (
          <a
            href={data.context.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="group mb-3 flex items-center gap-3"
          >
            <img
              src={data.context.cover.url}
              alt={data.context.name}
              className="h-12 w-12 shrink-0 object-cover"
            />
            <div className="min-w-0">
              <p className="text-[9px] font-bold tracking-[0.18em] text-gray-500 uppercase">
                {data.context.type === "playlist" ? "Playlist" : "Context"}
              </p>
              <p className="truncate text-xs font-bold text-white transition-colors group-hover:text-[#1db954]">
                {data.context.name}
              </p>
            </div>
          </a>
        )}
        <Row label="Track">
          <Link href={data.url}>{data.name}</Link>
        </Row>
        <Row label={data.artists.length > 1 ? "Artists" : "Artist"}>
          <div className="flex flex-col items-end gap-0.5">
            {data.artists.map((a) => (
              <Link key={a.url} href={a.url}>
                {a.name}
              </Link>
            ))}
          </div>
        </Row>
        <Row label="Album">
          <Link href={data.album.url}>{data.album.name}</Link>
        </Row>
        <Row label="Status">
          <span
            className="text-sm font-bold"
            style={{ color: data.isPlaying ? ACCENT : undefined }}
          >
            {data.isPlaying ? "● LIVE" : "Last played"}
          </span>
        </Row>

        {data.progress && (
          <div className="mt-auto pt-4">
            <div className="h-0.5 w-full overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full"
                style={{ width: `${progressPct}%`, background: ACCENT }}
              />
            </div>
            <div className="mt-1 flex justify-between text-[10px] text-gray-500">
              <span>{formatMs(positionMs)}</span>
              <span>{formatMs(data.progress.durationMs)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  ) : undefined;

  const badge = (
    <HexBadge accentColor={ACCENT}>
      <SpotifyIcon size={18} />
    </HexBadge>
  );

  return (
    <CardFrame
      back={back}
      badge={badge}
      series="MUSIC"
      backing="linear-gradient(135deg, #a855f7 0%, #6366f1 35%, #38bdf8 65%, #a855f7 100%)"
    >
      {loading ? (
        <p className="m-auto text-sm text-gray-400">Loading...</p>
      ) : error ? (
        <p className="m-auto text-sm text-gray-400">
          Error loading Spotify data.
        </p>
      ) : data ? (
        <div
          className="relative h-full w-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${data.album.cover.url}')` }}
        >
          <div
            className="absolute inset-x-0 bottom-0"
            style={{
              height: "60%",
              background:
                "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)",
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 pr-6 pb-6 text-right"
            style={{ paddingLeft: "calc(10% + 12px)" }}
          >
            <p
              className="text-[10px] font-bold tracking-widest wrap-break-word uppercase"
              style={{ color: ACCENT }}
            >
              {data.artists.map((a) => a.name).join(", ")}
            </p>
            <p className="text-2xl leading-tight font-black tracking-tight wrap-break-word uppercase">
              {data.name}
            </p>
            {data.progress && (
              <div className="mt-2 h-0.5 w-full overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${progressPct}%`, background: ACCENT }}
                />
              </div>
            )}
          </div>
        </div>
      ) : null}
    </CardFrame>
  );
}
