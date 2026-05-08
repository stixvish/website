export type SpotifyData = {
  isPlaying: boolean;
  title: string;
  artists: { name: string; url: string }[];
  album: string;
  albumArt: string | null;
  trackUrl: string;
  context: {
    name: string;
    url: string;
    coverUrl: string;
  } | null;
};
