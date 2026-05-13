import { useEffect, useState } from "react";
import type { GamingData } from "../types";

export function useGaming() {
  const [data, setData] = useState<GamingData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let currentController: AbortController | null = null;

    async function fetchGaming() {
      currentController?.abort();
      const controller = new AbortController();
      currentController = controller;

      try {
        const res = await fetch("https://worker.stixvish.com/gaming", {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(res.statusText);
        const json = await res.json();
        setError(null);
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
    const interval = setInterval(fetchGaming, 60_000);

    return () => {
      clearInterval(interval);
      currentController?.abort();
    };
  }, []);

  return { data, error, loading };
}
