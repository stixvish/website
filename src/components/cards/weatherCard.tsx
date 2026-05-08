import { useWeather } from "../../hooks/useWeather";
import { useTime } from "../../hooks/useTime";
import Spinner from "../icons/spinner";
import Weather from "../icons/weather";

export default function WeatherCard() {
  const { data: weather, error, loading } = useWeather();
  const { time, offset } = useTime("America/Chicago");

  return (
    <div className="flex justify-center rounded-2xl border-2">
      {loading ? (
        <Spinner logo={<Weather size={25} />} />
      ) : error ? (
        <div className="flex w-full items-center justify-center gap-2 px-4 py-4 text-[0.825rem] text-red-400">
          failed to load weather
        </div>
      ) : (
        weather && (
        <div className="flex w-full justify-between gap-4 px-6 py-6 leading-none md:px-8 md:py-8">
          <div className="flex flex-col justify-center gap-2">
            <h2 className="text-accent text-[0.825rem] font-bold tracking-tight uppercase md:text-sm">
              time in chicago ({offset})
            </h2>
            <h2 className="whitespace-nowrap text-[1.75rem] font-black uppercase md:text-5xl">
              {time}
            </h2>
          </div>
          <div className="flex flex-col items-end justify-center gap-2">
            <h1 className="text-[1.75rem] font-black md:text-5xl">
              {weather.temperature}&deg;F
            </h1>
            <h1 className="font-500 whitespace-nowrap text-[0.825rem] lowercase md:text-sm">
              {weather.condition}
            </h1>
          </div>
        </div>
        )
      )}
    </div>
  );
}
