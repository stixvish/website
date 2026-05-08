import { useLetterboxd } from "../../hooks/useLetterboxd";
import Spinner from "../icons/spinner";
import Letterboxd from "../icons/letterboxd";

export default function LetterboxdCard() {
  const { data: letterboxd, error, loading } = useLetterboxd();

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border-2">
      {loading ? (
        <Spinner logo={<Letterboxd height={5} width={30} />} />
      ) : error ? (
        <div className="flex w-full items-center justify-center gap-2 px-4 py-4 text-[0.825rem] text-red-400">
          failed to load letterboxd
        </div>
      ) : (
        letterboxd && (
          <>
            <div className="bg-muted flex w-full items-center justify-center gap-2 py-2">
              <Letterboxd height={5} width={30} />
              <h2 className="text-accent text-[0.825rem] font-bold tracking-tight uppercase">
                last watched movie
              </h2>
            </div>
            <div className="flex flex-1 items-center gap-4 px-4 py-4 md:gap-6 md:px-6 md:py-6">
              <a href={letterboxd.url ?? undefined} target="_blank" rel="noopener noreferrer">
                <div className="w-24 md:w-32">
                  <img
                    src={letterboxd.posterUrl ?? undefined}
                    alt="letterboxd movie poster"
                    className="w-full rounded-2xl border object-cover"
                  />
                </div>
              </a>
              <div className="flex flex-col gap-1 md:gap-2">
                <a href={letterboxd.url ?? undefined} target="_blank" rel="noopener noreferrer">
                  <h2 className="font-bold md:text-lg">
                    {letterboxd.title} ({letterboxd.year})
                  </h2>
                  <h2 className="font-bold md:text-base">{letterboxd.stars}</h2>
                </a>
                {letterboxd.review && (
                  <h2 className="italic md:text-sm">
                    &quot;{letterboxd.review.slice(0, 75)}...&quot;
                  </h2>
                )}
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
}
