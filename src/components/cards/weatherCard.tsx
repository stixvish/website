import { useWeather } from "../../hooks/useWeather";
import Spinner from "../icons/spinner";
import Weather from "../icons/weather";

export default function WeatherCard() {
  const { data: weather, error, loading } = useWeather();

  return (
    <div className="flex h-full flex-col items-end justify-center px-6 md:px-8">
      {loading ? (
        <Spinner logo={<Weather size={25} />} />
      ) : error ? (
        <div className="text-[0.825rem] text-red-400">
          failed to load weather
        </div>
      ) : (
        weather && (
          <>
            <h1 className="text-5xl font-black md:text-5xl lg:text-[3.5vw]">
              {weather.temperature}&deg;F
            </h1>
            <h1 className="text-subtle mt-1 text-sm lowercase">
              {weather.condition}
            </h1>
          </>
        )
      )}
    </div>
  );
}
