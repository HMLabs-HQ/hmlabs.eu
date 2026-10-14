const ORGANIZATIONS = ["HMLabs-HQ", "HMLabs-Gaming"] as const;
type Organization = (typeof ORGANIZATIONS)[number];

const KNOWN_PRIVATE_REPOSITORIES: Record<Organization, readonly string[]> = {
  "HMLabs-HQ": [],
  "HMLabs-Gaming": ["website", "js-launcher", "app"],
};

type GitHubRepository = {
  name: string;
  default_branch: string | null;
  stargazers_count: number;
};

export type GitHubStats = {
  repositories: number | null;
  stars: number | null;
  commits: number | null;
};

function createGitHubHeaders() {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = process.env.GITHUB_TOKEN;

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

function createRequestOptions() {
  return {
    headers: createGitHubHeaders(),
    next: { revalidate: 21600 },
    signal: AbortSignal.timeout(5000),
  };
}

async function getOrganizationRepositories(org: Organization) {
  const repositories: GitHubRepository[] = [];

  for (let page = 1; ; page += 1) {
    const response = await fetch(
      `https://api.github.com/orgs/${org}/repos?type=all&per_page=100&page=${page}`,
      createRequestOptions(),
    );

    if (!response.ok) {
      return null;
    }

    const pageRepositories = (await response.json()) as GitHubRepository[];
    repositories.push(...pageRepositories);

    if (pageRepositories.length < 100) {
      return repositories;
    }
  }
}

async function getRepositoryCommitCount(org: Organization, repository: GitHubRepository) {
  if (!repository.default_branch) {
    return 0;
  }

  const response = await fetch(
    `https://api.github.com/repos/${org}/${encodeURIComponent(repository.name)}/commits?per_page=1`,
    createRequestOptions(),
  );

  // GitHub returns 409 for repositories with no commits.
  if (response.status === 409) {
    return 0;
  }

  if (!response.ok) {
    return null;
  }

  const commits = (await response.json()) as unknown[];
  const lastPage = response.headers
    .get("Link")
    ?.match(/<[^>]*[?&]page=(\d+)[^>]*>;\s*rel="last"/);

  return lastPage ? Number(lastPage[1]) : commits.length;
}

async function getOrganizationStats(org: Organization) {
  let repositories: GitHubRepository[] | null;

  try {
    repositories = await getOrganizationRepositories(org);
  } catch {
    return { repositories: null, stars: null, commits: null };
  }

  if (!repositories) {
    return { repositories: null, stars: null, commits: null };
  }

  const commitCounts = await Promise.all(
    repositories.map(async (repository) => {
      try {
        return await getRepositoryCommitCount(org, repository);
      } catch {
        return null;
      }
    }),
  );

  return {
    repositories:
      repositories.length +
      KNOWN_PRIVATE_REPOSITORIES[org].filter(
        (privateRepository) =>
          !repositories.some(
            (repository) => repository.name.toLowerCase() === privateRepository,
          ),
      ).length,
    stars: repositories.reduce(
      (total, repository) => total + (repository.stargazers_count ?? 0),
      0,
    ),
    commits: commitCounts.every((count) => count !== null)
      ? commitCounts.reduce((total, count) => total + (count ?? 0), 0)
      : null,
  };
}

export async function getGitHubData(): Promise<GitHubStats> {
  const organizationData = await Promise.all(
    ORGANIZATIONS.map(async (org) => {
      try {
        return await getOrganizationStats(org);
      } catch {
        return { repositories: null, stars: null, commits: null };
      }
    }),
  );

  const sumAvailable = (values: Array<number | null>) => {
    const availableValues = values.filter(
      (value): value is number => value !== null,
    );

    return availableValues.length === values.length
      ? availableValues.reduce((total, value) => total + value, 0)
      : null;
  };

  return {
    repositories: sumAvailable(organizationData.map((data) => data.repositories)),
    stars: sumAvailable(organizationData.map((data) => data.stars)),
    commits: sumAvailable(organizationData.map((data) => data.commits)),
  };
}
