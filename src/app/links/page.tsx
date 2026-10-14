import Image from "next/image";
import Link from "next/link";

const LINKS = [
  {
    id: "hmlabs",
    label: "HMLabs",
    href: "https://hmlabs.eu",
    badge: "hm.png",
  },
  {
    id: "badges",
    label: "@henrymmey/badges",
    href: "https://badges.hmlabs.eu",
    badge: "hm.png",
  },
  {
    id: "gaming",
    label: "HML-G Website",
    href: "https://gaming.hmlabs.eu",
    badge: "hm-mc.png",
  },
  {
    id: "github-hq",
    label: "HML on GitHub",
    href: "https://github.com/HMLabs-HQ",
    badge: "github.png",
  },
  {
    id: "github-gaming",
    label: "HML-G on GitHub",
    href: "https://github.com/HMLabs-Gaming",
    badge: "github.png",
  },
  {
    id: "modrinth-current",
    label: "HML-G on Modrinth",
    href: "https://modrinth.com/organization/9zYhowm8",
    badge: "modrinth-color.png",
  },
  {
    id: "curseforge",
    label: "HML-G on CurseForge",
    href: "https://www.curseforge.com/members/henrymmey/projects",
    badge: "curseforge.svg",
  },
  {
    id: "spigotmc",
    label: "HML-G on SpigotMC",
    href: "https://www.spigotmc.org/members/henrymmey.2623317/",
    badge: "spigotmc-color.ico",
    unoptimized: true,
  },
  {
    id: "hangar",
    label: "HML-G on Hangar",
    href: "https://hangar.papermc.io/HMLabs-Gaming",
    badge: "hangar-color.ico",
    unoptimized: true,
  },
  {
    id: "planetminecraft",
    label: "HML-G on Planet Minecraft",
    href: "https://www.planetminecraft.com/member/henrymmey/",
    badge: "pmc-color.png",
  },
  {
    id: "gaming-release-workflows",
    label: "HML-G Release Workflows documentation",
    href: "https://release-workflows.gaming.hmlabs.eu/",
    badge: "icons8-globe.png",
  },
  {
    id: "discord",
    label: "Join our Discord server",
    href: "https://discord.gg/fuAx3waeHp",
    badge: "discord-color.png",
  },
  {
    id: "contact",
    label: "Contact HML",
    href: "mailto:hello@hmlabs.eu",
    badge: "icons8-email.png",
  },
];

export default function LinksPage() {
  return (
    <main className="w-full max-w-3xl px-6">
      <div className="flex flex-col items-center py-16 text-center sm:py-24">
        <div className="flex flex-col items-center gap-1 text-center">
          <div className="relative w-full">
            <h1 className="text-center text-3xl font-semibold text-white sm:text-4xl">
              HMLabs
            </h1>
            <span className="absolute bottom-0 left-[calc(50%+4.2rem)] whitespace-nowrap text-sm text-zinc-400 sm:left-[calc(50%+5rem)] sm:text-base">
              by Henry Meyer.
            </span>
          </div>
          <p className="mt-1 text-zinc-400">
            Independent projects, shared ideas.
          </p>
        </div>

        <div className="mt-10 flex w-full justify-center">
          <div className="flex w-full max-w-125 flex-col gap-3">
            {LINKS.map(({ id, label, href, badge, unoptimized }) => {
              const external = href.startsWith("https://");

              return (
                <a
                  key={id}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="group flex w-full items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-4 transition-colors hover:border-emerald-400/60"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex size-10 items-center justify-center overflow-hidden rounded-md border border-zinc-700 bg-zinc-800">
                      <Image
                        src={`/badges/${badge}`}
                        alt=""
                        width={28}
                        height={28}
                        unoptimized={unoptimized}
                      />
                    </div>
                    <span className="text-sm text-white sm:text-base">
                      {label}
                    </span>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="size-4 text-zinc-400 transition-colors group-hover:text-emerald-300"
                    aria-hidden="true"
                  >
                    <path
                      d="M14 3h7v7M10 14 21 3M21 3v7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              );
            })}
          </div>
        </div>

        <footer className="mt-12 flex flex-col items-center gap-4 text-xs text-zinc-500 sm:text-sm">
          <div className="flex items-center gap-4">
            <a
              href="https://henrymeyer.de/legal/imprint"
              className="transition-colors hover:text-zinc-300"
            >
              Imprint
            </a>
            <span aria-hidden="true" className="text-zinc-700">
              •
            </span>
            <Link
              href="/legal/privacy"
              className="transition-colors hover:text-zinc-300"
            >
              Privacy Policy
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
