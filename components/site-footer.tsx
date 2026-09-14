import { GithubIcon, LinkedinIcon, XIcon } from "@/components/brand-icons"

const socials = [
  { icon: GithubIcon, label: "GitHub", href: "#" },
  { icon: LinkedinIcon, label: "LinkedIn", href: "#" },
  { icon: XIcon, label: "X", href: "#" },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary font-display text-sm font-bold text-primary-foreground">
            H
          </span>
          <span className="font-display font-semibold">Hua Tong</span>
        </div>

        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Hua Tong. 保留所有权利。
        </p>

        <div className="flex gap-2">
          {socials.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
            >
              <Icon className="size-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
