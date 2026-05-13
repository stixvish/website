export type SpotifyData = {
  isPlaying: boolean;
  name: string;
  url: string;
  artists: { name: string; url: string }[];
  album: {
    name: string;
    url: string;
    cover: { url: string; width: number; height: number };
  };
  context: {
    type: string;
    name: string;
    url: string;
    cover: { url: string; width: number | null; height: number | null };
  } | null;
  progress: {
    positionMs: number;
    durationMs: number;
    timestamp: number;
  } | null;
};
