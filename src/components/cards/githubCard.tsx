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
    <div className="flex flex-col justify-center overflow-hidden rounded-2xl border-2">
      {loading ? (
        <Spinner logo={<GitHub height={25} />} />
      ) : error ? (
        <div className="flex w-full items-center justify-center gap-2 px-4 py-4 text-[0.825rem] text-red-400">
          failed to load github
        </div>
      ) : (
        github && github.lastRepo && (
          <>
            <div className="bg-muted flex w-full items-center justify-center gap-2 py-2">
              <GitHub height={25} />
              <h2 className="text-accent text-[0.825rem] font-bold tracking-tight uppercase">
                last commit
              </h2>
            </div>
            <div className="flex items-center justify-between px-4 py-4">
              <a
                href={github.lastRepo.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2 className="font-bold">{github.lastRepo.name}</h2>
                {github.lastRepo.language && (
                  <div className="flex items-center gap-1">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: github.lastRepo.language.color }}
                    />
                    <h2 className="text-[0.825rem]">
                      {github.lastRepo.language.name}
                    </h2>
                  </div>
                )}
              </a>
              <div>
                <h2>{github.lastRepo.description}</h2>
              </div>
            </div>
            <div className="border-muted flex items-center justify-between gap-4 border-t px-4 py-4">
              <a
                href="https://github.com/stixvish"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex h-8 items-center gap-2">
                  <img
                    src="https://images.stixvish.com/profile_cropped.jpeg"
                    alt="github profile avatar"
                    className="aspect-square h-full rounded-full border object-cover"
                  />
                  <h2 className="font-bold">@stixvish</h2>
                </div>
              </a>
              <h2>{timeAgo(github.lastRepo.pushedAt)}</h2>
            </div>
          </>
        )
      )}
    </div>
  );
}
