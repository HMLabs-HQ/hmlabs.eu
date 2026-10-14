"use client";

import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";
import type { ProjectLink } from "@/lib/project-infos";

export default function ProjectLinks({
  links,
  moreLinks,
}: {
  links: ProjectLink[];
  moreLinks?: ProjectLink[];
}) {
  const moreMenuRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    function closeOnOutsidePointer(event: PointerEvent) {
      if (
        moreMenuRef.current?.open &&
        !moreMenuRef.current.contains(event.target as Node)
      ) {
        moreMenuRef.current.open = false;
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && moreMenuRef.current?.open) {
        moreMenuRef.current.open = false;
      }
    }

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-base border border-border/30 bg-main px-3 py-1.5 text-sm font-heading text-main-foreground shadow-sm transition-opacity hover:opacity-80"
        >
          {link.label}
          <ArrowUpRight className="size-4" />
        </a>
      ))}
      {moreLinks?.length ? (
        <details className="group relative" ref={moreMenuRef}>
          <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded-base border border-border/30 bg-main px-3 py-1.5 text-sm font-heading text-main-foreground shadow-sm transition-opacity hover:opacity-80">
            More
            <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
          </summary>
          <div className="absolute right-0 top-full z-20 mt-2 flex min-w-56 flex-col gap-1 rounded-base border border-border/30 bg-background p-2 shadow-lg">
            {moreLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-3 rounded px-3 py-2 text-sm transition-colors hover:bg-main"
              >
                {link.label}
                <ArrowUpRight className="size-4 shrink-0" />
              </a>
            ))}
          </div>
        </details>
      ) : null}
    </div>
  );
}
