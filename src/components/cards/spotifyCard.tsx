import { useSpotify } from "../../hooks/useSpotify";
import Spinner from "../icons/spinner";
import Spotify from "../icons/spotify";

export default function SpotifyCard() {
  const { data: spotify, error, loading } = useSpotify();

  return (
    <div className="flex flex-col justify-center overflow-hidden rounded-2xl border-2">
      {loading ? (
        <Spinner logo={<Spotify size={25} />} />
      ) : (
        <>
          <div className="bg-muted flex w-full items-center justify-center gap-2 py-2">
            <Spotify size={20} />
            <h2 className="text-accent text-[0.825rem] font-bold tracking-tight uppercase">
              {spotify?.isPlaying
                ? "currently listening to"
                : "last played song"}
            </h2>
          </div>
          <div className="flex items-center gap-4 px-4 py-4">
            <a
              href={spotify?.trackUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="aspect-square h-24">
                <img
                  src={spotify?.albumArt}
                  alt="spotify song album art"
                  className="h-full rounded-2xl border object-cover"
                />
              </div>
            </a>
            <div className="flex flex-col gap-1">
              <a
                href={spotify?.trackUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2 className="font-bold">{spotify?.title}</h2>
              </a>
              <h2 className="italic">{spotify?.artist}</h2>
            </div>
          </div>
          {spotify?.context && (
            <div className="bg-muted flex w-full items-center justify-center gap-2 py-2">
              <h2 className="text-accent text-[0.825rem] font-bold tracking-tight uppercase">
                playing from
              </h2>
            </div>
          )}
          {spotify?.context && (
            <div className="flex items-center gap-4 px-4 py-4">
              <a
                href={spotify.context.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="aspect-square h-24">
                  <img
                    src={spotify.context.coverUrl}
                    alt="spotify song album art"
                    className="h-full rounded-2xl border object-cover"
                  />
                </div>
              </a>
              <div className="flex flex-col gap-1">
                <a
                  href={spotify.context.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h2 className="font-bold">{spotify.context.name}</h2>
                </a>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
