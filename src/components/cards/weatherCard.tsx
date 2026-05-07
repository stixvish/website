import { useWeather } from "../../hooks/useWeather";
import { useTime } from "../../hooks/useTime";
import Spinner from "../icons/spinner";
import Weather from "../icons/weather";

export default function WeatherCard() {
  const { data: weather, error, loading } = useWeather();
  const { time, offset } = useTime("America/Chicago");

  return (
    <div className="flex justify-center rounded-2xl border-2 md:w-[40vw]">
      {loading ? (
        <Spinner logo={<Weather size={25} />} />
      ) : (
        <div className="flex w-full justify-between gap-4 px-4 py-4 leading-none">
          <div className="flex flex-col justify-center gap-2">
            <h2 className="text-accent text-[0.825rem] font-bold tracking-tight uppercase">
              time in chicago ({offset})
            </h2>
            <h2 className="text-[1.75rem] font-black whitespace-nowrap uppercase">
              {time}
            </h2>
          </div>
          <div className="flex flex-col items-end justify-center gap-2">
            <h1 className="text-[1.75rem] font-black">
              {weather.temperature}&deg;F
            </h1>
            <h1 className="font-500 text-[0.825rem] whitespace-nowrap lowercase">
              {weather.condition}
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}
