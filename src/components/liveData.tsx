import SpotifyCard from "./cards/SpotifyCard";
import LetterboxdCard from "./cards/letterboxdCard";
import GamingCard from "./cards/gamingCard";
import WeatherCard from "./cards/weatherCard";
import GitHubCard from "./cards/githubCard";

export default function LiveData() {
  return (
    <div className="mt-2 flex flex-col items-center md:mt-4 md:gap-2">
      <div className="bg-default flex w-max items-center justify-center gap-4 rounded-2xl px-4">
        <div className="h-3 w-3 rounded-full bg-red-500" />
        <h1 className="text-2xl font-bold tracking-tight text-black uppercase">
          live data
        </h1>
      </div>
      <div className="mt-2 flex flex-col gap-2 px-4">
        <WeatherCard />
        <SpotifyCard />
        <LetterboxdCard />
        <GamingCard />
        <GitHubCard />
      </div>
    </div>
  );
}
