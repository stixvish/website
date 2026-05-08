export type GamingData = {
  title: string;
  coverUrl: string;
  lastPlayed: string | number;
  playtimeTotal: number;
  isPlaying?: boolean;
  platform: "steam" | "xbox";
};
