import { useGaming } from "../../hooks/useGaming";
import Spinner from "../icons/spinner";
import Xbox from "../icons/xbox";
import Steam from "../icons/steam";

export default function GamingCard() {
  const { data: gaming, error, loading } = useGaming();

  return (
    <div className="relative flex h-full min-h-72 flex-col overflow-hidden rounded-2xl border border-white/10 lg:min-h-0 lg:flex-row">
      {loading ? (
        <Spinner logo={<Xbox size={25} />} />
      ) : error ? (
        <div className="flex w-full items-center justify-center text-[0.825rem] text-red-400">
          failed to load gaming
        </div>
      ) : (
        gaming && (
          <>
            {/* background cover — mobile only */}
            <img
              src={gaming.coverUrl}
              alt="game poster"
              className="absolute inset-0 h-full w-full object-cover lg:hidden"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-black/10 lg:hidden" />

            {/* top bar — mobile only */}
            <div className="relative flex items-center justify-between p-4 lg:hidden">
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
              <span className="text-[0.75rem] font-bold tracking-wider text-white/80 uppercase">
                {gaming.isPlaying ? "now · playing" : "last played"}
              </span>
            </div>

            {/* spacer — mobile only */}
            <div className="flex-1 lg:hidden" />

            {/* bottom info — mobile only */}
            <div className="relative flex flex-col gap-1 p-5 lg:hidden">
              <h2 className="text-2xl font-black">{gaming.title}</h2>
              <p className="text-sm text-white/60">
                {gaming.playtimeTotal} hrs played
              </p>
            </div>

            {/* desktop: horizontal layout */}
            <div className="hidden lg:flex lg:h-full lg:w-full lg:items-center lg:gap-5 lg:pr-6">
              <div className="lg:h-full lg:shrink-0 lg:overflow-hidden">
                <img
                  src={gaming.coverUrl}
                  alt="game poster"
                  className="block h-full w-auto object-cover"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
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
                <h2 className="text-xl font-black">{gaming.title}</h2>
                <h2 className="text-subtle text-[0.825rem]">
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
