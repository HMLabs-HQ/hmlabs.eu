export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectInfo = {
  slug: string;
  title: string;
  description: string;
  role?: string;
  showRole?: boolean;
  showTags?: boolean;
  showDetailsButton?: boolean;
  showInSitemap?: boolean;
  tags: string[];
  links: ProjectLink[];
  moreLinks?: ProjectLink[];
  priority: number;
  publishedAt: string;
};

export type ProjectSortBy = "priority" | "date";
export type SortDirection = "asc" | "desc";

type ProjectSortOptions = {
  sortBy?: ProjectSortBy;
  direction?: SortDirection;
};

const projectInfos: ProjectInfo[] = [
  {
    slug: "badges",
    title: "@henrymmey/badges",
    description:
      "A collection of badges for displaying your profiles, projects, and communities.",
    showTags: false,
    showDetailsButton: false,
    showInSitemap: false,
    tags: [],
    links: [
      { label: "Website", href: "https://badges.hmlabs.eu" },
      { label: "GitHub Repo", href: "https://github.com/HMLabs-HQ/badges" },
    ],
    moreLinks: [
      {
        label: "NPM",
        href: "https://www.npmjs.com/package/@henrymmey/badges",
      },
      {
        label: "GitHub Website Repo",
        href: "https://github.com/HMLabs-HQ/badges-docs",
      },
    ],

    priority: 2,
    publishedAt: "2026-10-13",
  },
  {
    slug: "hmlabs-gaming",
    title: "HMLabs Gaming",
    description:
      "Minecraft projects of all kinds, including mods, modpacks, and resource packs.",
    showTags: false,
    showDetailsButton: false,
    showInSitemap: false,
    tags: [],
    links: [
      { label: "Website", href: "https://gaming.hmlabs.eu" },
      { label: "GitHub", href: "https://github.com/HMLabs-Gaming" },
    ],
    moreLinks: [
      {
        label: "Modrinth",
        href: "https://modrinth.com/organization/9zYhowm8",
      },
      {
        label: "CurseForge",
        href: "https://www.curseforge.com/members/henrymmey/projects",
      },
      {
        label: "SpigotMC",
        href: "https://www.spigotmc.org/members/henrymmey.2623317/",
      },
      {
        label: "Hangar",
        href: "https://hangar.papermc.io/HMLabs-Gaming",
      },
      {
        label: "Planet Minecraft",
        href: "https://www.planetminecraft.com/member/henrymmey/",
      },
      {
        label: "Release Workflows documentation",
        href: "https://release-workflows.gaming.hmlabs.eu/",
      },
    ],
    priority: 1,
    publishedAt: "2025-12-31",
  },
];

export function getProjectInfos(): ProjectInfo[] {
  return projectInfos;
}

export function getProjectInfoBySlug(slug: string): ProjectInfo | null {
  return projectInfos.find((project) => project.slug === slug) ?? null;
}

export function getProjectSlugs(): string[] {
  return projectInfos.map((project) => project.slug);
}

export function getProjectInfosSorted(
  options: ProjectSortOptions = {},
): ProjectInfo[] {
  const { sortBy = "priority", direction = "asc" } = options;

  return [...projectInfos].sort((a, b) => {
    const priorityDiff = a.priority - b.priority;
    const dateDiff = Date.parse(a.publishedAt) - Date.parse(b.publishedAt);

    if (sortBy === "priority") {
      const primary = direction === "asc" ? priorityDiff : -priorityDiff;
      return primary || (direction === "asc" ? -dateDiff : dateDiff);
    }

    const primary = direction === "asc" ? dateDiff : -dateDiff;
    return primary || (direction === "asc" ? priorityDiff : -priorityDiff);
  });
}

export function getProjectInfosSortedByPriority(): ProjectInfo[] {
  return getProjectInfosSorted({ sortBy: "priority", direction: "asc" });
}

export function getNewestProjectInfos(count: number): ProjectInfo[] {
  return getProjectInfosSortedByPriority().slice(0, count);
}
