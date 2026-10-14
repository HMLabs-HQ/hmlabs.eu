import { Alert, AlertDescription } from "@/components/ui";
import { getGitHubData } from "@/lib/github";

const metrics = [
  { key: "repositories", label: "Repositories" },
  { key: "commits", label: "Commits" },
  { key: "stars", label: "Stars" },
] as const;

export default async function GitHubStats() {
  const stats = await getGitHubData();
  const hasUnavailableMetrics = metrics.some(({ key }) => stats[key] === null);

  return (
    <div className="mt-8">
      <div className="flex w-fit flex-wrap items-center gap-8 rounded-base border border-border/30 px-5 py-3 text-main-foreground">
        {metrics.map(({ key, label }) => (
          <div key={key} className="flex items-baseline gap-2">
            <p className="text-2xl font-heading">{stats[key] ?? "N/A"}</p>
            <p className="font-mono text-xs opacity-75">{label}</p>
          </div>
        ))}
      </div>
      {hasUnavailableMetrics ? (
        <Alert className="mt-3 max-w-xl bg-background text-foreground">
          <AlertDescription>
            Some GitHub statistics are temporarily unavailable. Please try again
            later.
          </AlertDescription>
        </Alert>
      ) : null}
    </div>
  );
}
