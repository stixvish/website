import { useLetterboxd } from "../../hooks/useLetterboxd";
import Spinner from "../icons/spinner";
import Letterboxd from "../icons/letterboxd";

export default function LetterboxdCard() {
  const { data: letterboxd, error, loading } = useLetterboxd();

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10">
      {loading ? (
        <Spinner logo={<Letterboxd height={5} width={30} />} />
      ) : error ? (
        <div className="flex h-full items-center justify-center text-[0.825rem] text-red-400">
          failed to load letterboxd
        </div>
      ) : (
        letterboxd && (
          <>
            {/* header */}
            <div className="bg-muted flex w-full items-center justify-center gap-2 py-2">
              <Letterboxd height={5} width={30} />
              <h2 className="text-accent text-[0.825rem] font-bold tracking-tight uppercase">
                last watched movie
              </h2>
            </div>

            {/* poster fills remaining space */}
            <a
              href={letterboxd.url ?? undefined}
              target="_blank"
              rel="noopener noreferrer"
              className="relative min-h-64 flex-1 overflow-hidden"
            >
              <img
                src={letterboxd.posterUrl ?? undefined}
                alt="letterboxd movie poster"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute right-0 bottom-0 left-0 flex flex-col gap-1 p-4">
                <h2 className="leading-tight font-bold">
                  {letterboxd.title} ({letterboxd.year})
                </h2>
                <h2 className="text-sm">{letterboxd.stars}</h2>
                {letterboxd.review && (
                  <h2 className="text-[0.75rem] leading-snug text-white/70 italic">
                    &quot;{letterboxd.review}&quot;
                  </h2>
                )}
              </div>
            </a>
          </>
        )
      )}
    </div>
  );
}
