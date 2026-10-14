import GitHubStats from "@/components/github-section";
import ProjectLinks from "@/components/project-links";
import SectionHeading from "@/components/section-heading";
import SiteFooter from "@/components/site-footer";
import { getSubsiteProjects } from "@/lib/subsite-projects";

export default function Page() {
  const projects = getSubsiteProjects();

  return (
    <main className="relative mx-auto w-full max-w-6xl px-4 pb-0 md:px-8 md:pb-0">
      <section className="mb-8 rounded-base border border-border/30 bg-main p-6 text-main-foreground shadow-sm md:p-8">
        <p className="mb-3 text-sm font-heading uppercase tracking-wide text-main-foreground/75">
          Independent projects, shared ideas
        </p>
        <h1 className="mb-3 text-3xl font-heading leading-tight sm:text-5xl">
          Welcome to <span className="text-foreground">HMLabs</span>
        </h1>
        <p className="max-w-3xl text-base leading-relaxed">
          HMLabs is home to open source projects across software, tools, and
          Minecraft. Explore what we are building and find each project in its
          own space.
        </p>
        <GitHubStats />
      </section>

      <section
        id="projects"
        className="mb-8 rounded-base border border-border/30 bg-secondary-background p-6 shadow-sm"
      >
        <SectionHeading index="01" title="Projects" />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="rounded-base border border-border/30 bg-background p-5 shadow-sm"
            >
              <h3 className="mb-3 text-xl font-heading">{project.title}</h3>
              <p className="mb-5 text-sm leading-relaxed text-foreground/80">
                {project.description}
              </p>
              <ProjectLinks
                links={project.links}
                moreLinks={project.moreLinks}
              />
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
