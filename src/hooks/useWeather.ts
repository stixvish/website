import { useEffect, useState } from "react";
import type { WeatherData } from "../types";

export function useWeather() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchWeather() {
      try {
        const res = await fetch("https://worker.stixvish.com/weather", {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(res.statusText);
        const json = await res.json();
        setData(json);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
    const interval = setInterval(fetchWeather, 1_800_000);

    return () => {
      clearInterval(interval);
      controller.abort();
    };
  }, []);

  return { data, error, loading };
}
