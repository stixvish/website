import { useGaming } from "../../hooks/useGaming";
import Spinner from "../icons/spinner";
import Xbox from "../icons/xbox";
import Steam from "../icons/steam";

export default function GamingCard() {
  const { data: gaming, error, loading } = useGaming();

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border-2">
      {loading ? (
        <Spinner logo={<Xbox size={25} />} />
      ) : error ? (
        <div className="flex w-full items-center justify-center gap-2 px-4 py-4 text-[0.825rem] text-red-400">
          failed to load gaming
        </div>
      ) : (
        gaming && (
          <>
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
                  <Xbox size={25} fill="#107c10" />
                ) : (
                  <Steam size={25} />
                )}
              </span>
              <h2 className="text-accent text-[0.825rem] font-bold tracking-tight uppercase">
                {gaming.isPlaying ? "currently playing" : "last played game"}
              </h2>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-6">
              <img
                src={gaming.coverUrl}
                alt="game poster"
                className="w-full max-w-40 rounded-2xl border object-cover md:max-w-48"
              />
              <div className="flex flex-col items-center gap-1">
                <h2 className="text-center font-bold md:text-xl">
                  {gaming.title}
                </h2>
                <h2 className="text-[0.825rem]">
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
