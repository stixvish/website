export type GitHubData = {
  totalContributions: number;
  streak: number;
  avatarUrl: string | null;
  contributionDays: { date: string; count: number }[];
  lastRepo: {
    name: string;
    description: string | null;
    url: string;
    pushedAt: string;
    language: {
      name: string;
      color: string;
    } | null;
    lastCommit: {
      message: string | null;
      branch: string;
    } | null;
  } | null;
};
