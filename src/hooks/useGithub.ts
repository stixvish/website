import { useEffect, useState } from "react";
import type { GitHubData } from "../types";

export function useGitHub() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchGitHub() {
      try {
        const res = await fetch("https://worker.stixvish.com/github", {
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

    fetchGitHub();
    const interval = setInterval(fetchGitHub, 900_000);

    return () => {
      clearInterval(interval);
      controller.abort();
    };
  }, []);

  return { data, error, loading };
}
