export type SpotifyData = {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumArt: string;
  trackUrl: string;
  context: {
    name: string;
    url: string;
    coverUrl: string;
  } | null;
};
