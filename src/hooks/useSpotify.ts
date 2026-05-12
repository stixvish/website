import { useEffect, useState } from "react";
import type { SpotifyData } from "../types";

export function useSpotify() {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let currentController: AbortController | null = null;

    async function fetchSpotify() {
      currentController?.abort();
      const controller = new AbortController();
      currentController = controller;

      try {
        const res = await fetch("https://worker.stixvish.com/spotify", {
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

    fetchSpotify();
    const interval = setInterval(fetchSpotify, 30_000);

    return () => {
      clearInterval(interval);
      currentController?.abort();
    };
  }, []);

  return { data, error, loading };
}
