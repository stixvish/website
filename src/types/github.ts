export type GitHubData = {
  totalContributions: number;
  streak: number;
  lastRepo: {
    name: string;
    description: string | null;
    url: string;
    pushedAt: string;
    language: {
      name: string;
      color: string;
    };
  };
};
