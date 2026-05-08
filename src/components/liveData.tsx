import SpotifyCard from "./cards/spotifyCard";
import LetterboxdCard from "./cards/letterboxdCard";
import GitHubCard from "./cards/githubCard";
import WeatherCard from "./cards/weatherCard";
import TimeCard from "./cards/timeCard";
import GamingCard from "./cards/gamingCard";

export default function LiveData() {
  return (
    <div className="w-full px-6 py-8 lg:px-[10dvw]">
      <div className="flex flex-col gap-2 lg:h-[70vh] lg:flex-row">
        {/* Spotify: full width mobile, left half desktop */}
        <div className="h-72 lg:h-auto lg:flex-1">
          <SpotifyCard />
        </div>

        {/* Right side: 2-col grid at all sizes */}
        <div className="grid grid-cols-2 gap-2 lg:flex-1 lg:grid-rows-[auto_2fr_1fr]">
          <div className="col-span-2 flex items-center">
            <div className="min-w-0 flex-1 overflow-hidden">
              <TimeCard />
            </div>
            <div className="min-w-0 flex-1 overflow-hidden">
              <WeatherCard />
            </div>
          </div>
          {/* Full width on mobile, half width on desktop */}
          <div className="col-span-2 lg:col-span-1">
            <LetterboxdCard />
          </div>
          <div className="col-span-2 lg:col-span-1">
            <GitHubCard />
          </div>
          <div className="col-span-2 min-h-0">
            <GamingCard />
          </div>
        </div>
      </div>
    </div>
  );
}
