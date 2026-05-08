import SpotifyCard from "./cards/spotifyCard";
import LetterboxdCard from "./cards/letterboxdCard";
import GamingCard from "./cards/gamingCard";
import WeatherCard from "./cards/weatherCard";
import GitHubCard from "./cards/githubCard";

export default function LiveData() {
  return (
    <div className="mt-2 flex flex-col items-center md:mt-4 md:gap-2">
      <div className="bg-default flex w-max items-center justify-center gap-4 rounded-2xl px-4">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-black uppercase">
          live data
        </h1>
      </div>
      <div className="mt-2 grid w-full max-w-5xl grid-cols-1 gap-2 px-4 md:grid-cols-3">
        <div className="md:col-span-3"><WeatherCard /></div>
        <div className="md:col-span-2"><SpotifyCard /></div>
        <div className="md:col-span-1"><GamingCard /></div>
        <div className="md:col-span-1"><LetterboxdCard /></div>
        <div className="md:col-span-2"><GitHubCard /></div>
      </div>
    </div>
  );
}
