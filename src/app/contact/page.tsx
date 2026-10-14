import SiteFooter from "@/components/site-footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact HMLabs by email or join the HMLabs Discord server.",
  alternates: { canonical: "https://hmlabs.eu/contact" },
};

export default function ContactPage() {
  return (
    <main className="relative mx-auto w-full max-w-6xl px-4 pb-0 md:px-8 md:pb-0">
      <section className="mb-8 rounded-base border border-border/30 bg-main p-6 text-main-foreground shadow-sm md:p-8">
        <h1 className="mb-2 text-3xl font-heading md:text-4xl">Contact</h1>
        <p className="max-w-3xl text-sm leading-relaxed md:text-base">
          Have a question about a project or want to get in touch? Reach us by
          email or join our Discord community.
        </p>
      </section>

      <section className="mb-8 grid gap-4 md:grid-cols-2">
        <article className="rounded-base border border-border/30 bg-secondary-background p-6 shadow-sm md:p-8">
          <h2 className="mb-3 text-xl font-heading">Email</h2>
          <a
            href="mailto:hello@hmlabs.eu"
            className="text-sm underline underline-offset-2 md:text-base"
          >
            hello@hmlabs.eu
          </a>
        </article>
        <article className="rounded-base border border-border/30 bg-secondary-background p-6 shadow-sm md:p-8">
          <h2 className="mb-3 text-xl font-heading">Discord</h2>
          <p className="mb-4 text-sm leading-relaxed md:text-base">
            Join the HMLabs Discord server to chat with the community.
          </p>
          <a
            href="https://discord.gg/fuAx3waeHp"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-base border border-border/30 bg-main px-3 py-1.5 text-sm font-heading text-main-foreground shadow-sm transition-opacity hover:opacity-80"
          >
            Join Discord
          </a>
        </article>
      </section>

      <SiteFooter />
    </main>
  );
}
