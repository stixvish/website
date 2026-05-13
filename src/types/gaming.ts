export type GamingData = {
  isPlaying: boolean;
  platform: string;
  game: string;
  cover: { url?: string; width: number | null; height: number | null };
  lastPlayedAt: string;
  playtimeMinutes: number;
  status?: string | null;
};
