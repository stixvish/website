import { useEffect, useState } from "react";
import type { GamingData } from "../types";

export function useGaming() {
  const [data, setData] = useState<GamingData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchGaming() {
      try {
        const res = await fetch("https://worker.stixvish.com/gaming", {
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

    fetchGaming();
    const interval = setInterval(fetchGaming, 90_000);

    return () => {
      clearInterval(interval);
      controller.abort();
    };
  }, []);

  return { data, error, loading };
}
