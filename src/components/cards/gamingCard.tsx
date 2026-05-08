import { useGaming } from "../../hooks/useGaming";
import Spinner from "../icons/spinner";
import Xbox from "../icons/xbox";
import Steam from "../icons/steam";

export default function GamingCard() {
  const { data: gaming, error, loading } = useGaming();

  return (
    <div className="flex h-full min-h-72 flex-col overflow-hidden rounded-2xl border border-white/10 lg:min-h-0">
      {loading ? (
        <Spinner logo={<Xbox size={25} />} />
      ) : error ? (
        <div className="flex h-full items-center justify-center text-[0.825rem] text-red-400">
          failed to load gaming
        </div>
      ) : (
        gaming && (
          <>
            {/* header */}
            <div className="bg-muted flex w-full items-center justify-center gap-2 py-2">
              <span className="relative inline-flex items-center justify-center">
                {gaming.isPlaying && (
                  <span
                    className="absolute inset-0 animate-ping rounded-full opacity-50"
                    style={{
                      backgroundColor:
                        gaming.platform === "xbox" ? "#107c10" : "#c3c3c3",
                    }}
                  />
                )}
                {gaming.platform === "xbox" ? (
                  <Xbox size={18} fill="#107c10" />
                ) : (
                  <Steam size={18} />
                )}
              </span>
              <h2 className="text-accent text-[0.825rem] font-bold tracking-tight uppercase">
                {gaming.isPlaying ? "now playing" : "last played"}
              </h2>
            </div>

            {/* cover fills remaining space */}
            <div className="relative min-h-0 flex-1 overflow-hidden">
              <img
                src={gaming.coverUrl}
                alt="game cover"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute right-0 bottom-0 left-0 flex flex-col gap-1 p-4">
                <h2 className="leading-tight font-bold">{gaming.title}</h2>
                <h2 className="text-sm text-white/70">
                  {gaming.playtimeTotal} hrs played
                </h2>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
}
