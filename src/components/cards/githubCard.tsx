import { useGitHub } from "../../hooks/useGithub";
import Spinner from "../icons/spinner";
import GitHub from "../icons/github";

function timeAgo(dateStr: string) {
  const diff = (new Date(dateStr).getTime() - Date.now()) / 1000;
  const abs = Math.abs(diff);

  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 31536000],
    ["month", 2592000],
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
    ["second", 1],
  ];

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  for (const [unit, seconds] of units) {
    if (abs >= seconds) {
      return rtf.format(Math.round(diff / seconds), unit);
    }
  }

  return "just now";
}

export default function GitHubCard() {
  const { data: github, error, loading } = useGitHub();

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border-2">
      {loading ? (
        <Spinner logo={<GitHub height={25} />} />
      ) : error ? (
        <div className="flex w-full items-center justify-center gap-2 px-4 py-4 text-[0.825rem] text-red-400">
          failed to load github
        </div>
      ) : (
        github && (
          <>
            {/* header */}
            <div className="bg-muted flex w-full items-center justify-center gap-2 py-2">
              <GitHub height={25} />
              <h2 className="text-accent text-[0.825rem] font-bold tracking-tight uppercase">
                last commit
              </h2>
            </div>

            {/* stats row */}
            <div className="grid grid-cols-2 divide-x border-b">
              <div className="flex flex-col items-center justify-center gap-1 px-6 py-5 md:py-6">
                <span className="text-3xl font-black md:text-4xl">
                  {github.totalContributions}
                </span>
                <span className="text-[0.825rem] font-bold tracking-tight uppercase">
                  contributions
                </span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-6 py-5 md:py-6">
                <span className="text-3xl font-black md:text-4xl">
                  {github.streak}
                </span>
                <span className="text-[0.825rem] font-bold tracking-tight uppercase">
                  day streak
                </span>
              </div>
            </div>

            {/* repo + commit */}
            {github.lastRepo && (
              <div className="flex flex-1 flex-col justify-center gap-3 px-6 py-5 md:px-8 md:py-6">
                <a
                  href={github.lastRepo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <h2 className="font-bold md:text-xl">
                    {github.lastRepo.name}
                  </h2>
                  {github.lastRepo.language && (
                    <div className="flex items-center gap-1">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{
                          backgroundColor: github.lastRepo.language.color,
                        }}
                      />
                      <span className="text-[0.825rem] md:text-sm">
                        {github.lastRepo.language.name}
                      </span>
                    </div>
                  )}
                </a>
                {github.lastRepo.lastCommit && (
                  <div className="flex items-center gap-2">
                    <span className="font-bold md:text-lg">
                      {github.lastRepo.lastCommit.message}
                    </span>
                    <span className="text-turq rounded-full border px-2 py-0.5 text-[0.75rem]">
                      {github.lastRepo.lastCommit.branch}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* footer */}
            <div className="border-muted flex items-center justify-between border-t px-6 py-4 md:px-8 md:py-5">
              <a
                href="https://github.com/stixvish"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex h-8 items-center gap-2 md:h-10">
                  <img
                    src={github.avatarUrl ?? undefined}
                    alt="github profile avatar"
                    className="aspect-square h-full rounded-full border object-cover"
                  />
                  <h2 className="font-bold md:text-base">@stixvish</h2>
                </div>
              </a>
              {github.lastRepo && (
                <h2 className="text-[0.825rem] md:text-sm">
                  {timeAgo(github.lastRepo.pushedAt)}
                </h2>
              )}
            </div>
          </>
        )
      )}
    </div>
  );
}
