import {
  getProjectInfosSorted,
  type ProjectInfo,
  type ProjectSortBy,
  type SortDirection,
} from "@/lib/project-infos";

export type SubsiteProject = ProjectInfo;

type SubsiteProjectSortOptions = {
  sortBy?: ProjectSortBy;
  direction?: SortDirection;
};

export function getSubsiteProjects(
  options: SubsiteProjectSortOptions = {},
): SubsiteProject[] {
  return getProjectInfosSorted(options);
}
