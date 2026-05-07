import { useEffect, useState } from "react";
import type { LetterboxdData } from "../types";

export function useLetterboxd() {
  const [data, setData] = useState<LetterboxdData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchLetterboxd() {
      try {
        const res = await fetch("https://worker.stixvish.com/letterboxd", {
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

    fetchLetterboxd();
    const interval = setInterval(fetchLetterboxd, 3_600_000);

    return () => {
      clearInterval(interval);
      controller.abort();
    };
  }, []);

  return { data, error, loading };
}
