import Link from "next/link";
import ThemeModeSelect from "@/components/theme-mode-select";

const socialLinks = [
  { label: "HML on GitHub", href: "https://github.com/HMLabs-HQ" },
  {
    label: "HML-G on GitHub",
    href: "https://github.com/HMLabs-Gaming",
  },
  {
    label: "HML Gaming website",
    href: "https://gaming.hmlabs.eu/",
  },
];

export default function SiteFooter() {
  const commitSha = process.env.VERCEL_GIT_COMMIT_SHA;
  const commitUrl = commitSha
    ? `https://github.com/HMLabs-HQ/hmlabs.eu/commit/${commitSha}`
    : "https://github.com/HMLabs-HQ/hmlabs.eu/commits/main";

  return (
    <footer className="ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] mt-8 border-t border-border/30 bg-secondary-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-base border border-border/30 bg-background p-4">
            <h3 className="mb-3 text-sm font-heading">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link className="underline underline-offset-2" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="underline underline-offset-2" href="/projects">
                  Projects
                </Link>
              </li>
              <li>
                <Link className="underline underline-offset-2" href="/links">
                  Links
                </Link>
              </li>
              <li>
                <Link className="underline underline-offset-2" href="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="rounded-base border border-border/30 bg-background p-4">
            <h3 className="mb-3 text-sm font-heading">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  className="underline underline-offset-2"
                  href="https://henrymeyer.de/legal/imprint"
                >
                  Imprint
                </a>
              </li>
              <li>
                <Link
                  className="underline underline-offset-2"
                  href="/legal/privacy"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  className="underline underline-offset-2"
                  href="/code-of-conduct"
                >
                  Code of Conduct
                </Link>
              </li>
            </ul>
          </div>

          <div className="rounded-base border border-border/30 bg-background p-4">
            <h3 className="mb-3 text-sm font-heading">Appearance</h3>
            <ThemeModeSelect />
          </div>

          <div className="rounded-base border border-border/30 bg-background p-4">
            <h3 className="mb-3 text-sm font-heading">HML online</h3>
            <ul className="space-y-2 text-sm">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    className="underline underline-offset-2"
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-4 rounded-base border border-border/30 bg-main px-4 py-3 text-sm text-main-foreground">
          <div>© 2026 HML. Code licensed under GPL-3.0.</div>
          <div className="mt-1 text-xs text-main-foreground/70">
            Running on{" "}
            <a
              className="underline underline-offset-2"
              href={commitUrl}
              target="_blank"
              rel="noreferrer"
            >
              {commitSha ? commitSha.slice(0, 7) : "main"}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
