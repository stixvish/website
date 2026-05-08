import { useSpotify } from "../../hooks/useSpotify";
import Spinner from "../icons/spinner";
import Spotify from "../icons/spotify";

export default function SpotifyCard() {
  const { data: spotify, error, loading } = useSpotify();

  return (
    <div className="flex h-full flex-col justify-center overflow-hidden rounded-2xl border-2">
      {loading ? (
        <Spinner logo={<Spotify size={25} />} />
      ) : error ? (
        <div className="flex w-full items-center justify-center gap-2 px-4 py-4 text-[0.825rem] text-red-400">
          failed to load spotify
        </div>
      ) : (
        spotify && (
          <>
            <div className="bg-muted flex w-full items-center justify-center gap-2 py-2">
              <span className="relative inline-flex items-center justify-center">
                {spotify.isPlaying && (
                  <span className="absolute inset-0 animate-ping rounded-full bg-[#1db954]/50" />
                )}
                <Spotify size={20} />
              </span>
              <h2 className="text-accent text-[0.825rem] font-bold tracking-tight uppercase">
                {spotify.isPlaying
                  ? "currently listening to"
                  : "last played song"}
              </h2>
            </div>
            <div className="flex items-center gap-4 px-4 py-4 md:gap-6 md:px-6 md:py-6">
              <a
                href={spotify.trackUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="aspect-square h-24 md:h-36">
                  <img
                    src={spotify.albumArt ?? undefined}
                    alt="spotify song album art"
                    className="h-full rounded-2xl border object-cover"
                  />
                </div>
              </a>
              <div className="flex flex-col gap-1 md:gap-2">
                <a
                  href={spotify.trackUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h2 className="font-bold md:text-xl">{spotify.title}</h2>
                </a>
                <h2 className="italic md:text-base">
                  {spotify.artists.map((a, i) => (
                    <span key={a.url}>
                      <a href={a.url} target="_blank" rel="noopener noreferrer">
                        {a.name}
                      </a>
                      {i < spotify.artists.length - 1 && ", "}
                    </span>
                  ))}
                </h2>
              </div>
            </div>
            {spotify.context && (
              <>
                <div className="bg-muted flex w-full items-center justify-center gap-2 py-2">
                  <h2 className="text-accent text-[0.825rem] font-bold tracking-tight uppercase">
                    playing from
                  </h2>
                </div>
                <div className="flex items-center gap-4 px-4 py-4 md:gap-6 md:px-6 md:py-6">
                  <a
                    href={spotify.context.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="aspect-square h-24 md:h-36">
                      <img
                        src={spotify.context.coverUrl}
                        alt="spotify context cover art"
                        className="aspect-square h-full rounded-2xl border object-cover"
                      />
                    </div>
                  </a>
                  <div className="flex flex-col gap-1 md:gap-2">
                    <a
                      href={spotify.context.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <h2 className="font-bold md:text-xl">
                        {spotify.context.name}
                      </h2>
                    </a>
                  </div>
                </div>
              </>
            )}
          </>
        )
      )}
    </div>
  );
}
