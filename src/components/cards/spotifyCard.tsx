import { useSpotify } from "../../hooks/useSpotify";
import Spinner from "../icons/spinner";
import Spotify from "../icons/spotify";

export default function SpotifyCard() {
  const { data: spotify, error, loading } = useSpotify();

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10">
      {loading ? (
        <div className="flex h-full items-center justify-center">
          <Spinner logo={<Spotify size={25} />} />
        </div>
      ) : error ? (
        <div className="flex h-full items-center justify-center text-[0.825rem] text-red-400">
          failed to load spotify
        </div>
      ) : (
        spotify && (
          <>
            {/* background album art */}
            {spotify.albumArt && (
              <>
                <img
                  src={spotify.albumArt ?? undefined}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-black/10" />
              </>
            )}

            {/* top bar */}
            <div className="relative flex items-center justify-between p-4">
              <span className="relative inline-flex items-center justify-center">
                {spotify.isPlaying && (
                  <span className="absolute inset-0 animate-ping rounded-full bg-[#1DB954] opacity-50" />
                )}
                <Spotify size={18} />
              </span>
              <span className="text-[0.75rem] font-bold uppercase tracking-wider text-white/80">
                {spotify.isPlaying ? "live · now" : "last played"}
              </span>
            </div>

            {/* spacer */}
            <div className="flex-1" />

            {/* bottom: song info */}
            <div className="relative flex flex-col gap-2 p-5 md:p-7">
              {spotify.context && (
                <a
                  href={spotify.context.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-1 flex items-center gap-2"
                >
                  <img
                    src={spotify.context.coverUrl}
                    alt="context cover"
                    className="aspect-square h-7 w-7 rounded object-cover opacity-80"
                  />
                  <span className="text-[0.75rem] tracking-tight text-white/50 uppercase">
                    {spotify.context.name}
                  </span>
                </a>
              )}
              <a
                href={spotify.trackUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2 className="text-2xl leading-tight font-black md:text-3xl">
                  {spotify.title}
                </h2>
              </a>
              <p className="text-sm text-white/60 italic">
                {spotify.artists.map((a, i) => (
                  <span key={a.url}>
                    <a
                      href={a.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white/90"
                    >
                      {a.name}
                    </a>
                    {i < spotify.artists.length - 1 && ", "}
                  </span>
                ))}
              </p>
            </div>
          </>
        )
      )}
    </div>
  );
}
