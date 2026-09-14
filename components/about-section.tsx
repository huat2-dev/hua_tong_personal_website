import Image from "next/image"
import { Code2, Palette, Rocket } from "lucide-react"

const highlights = [
  { icon: Code2, label: "整洁的代码" },
  { icon: Palette, label: "精致的设计" },
  { icon: Rocket, label: "快速的交付" },
]

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-16 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="relative mx-auto w-full max-w-xs sm:max-w-sm lg:mx-0">
          <div
            aria-hidden="true"
            className="absolute -bottom-4 -left-4 size-24 rounded-2xl bg-primary/20"
          />
          <div
            aria-hidden="true"
            className="absolute -top-4 -right-4 size-24 rounded-2xl bg-accent/20"
          />
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
            <Image
              src="/images/headshot.png"
              alt="Hua Tong 在工作"
              width={480}
              height={520}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div>
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">关于我</span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            用心构建每一个界面
          </h2>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground text-pretty">
            <p>
              我是一名拥有 3 年经验的 Web 开发者与设计师。从最初的一行 CSS 到如今为品牌打造完整的数字产品，我始终相信优秀的网站源于设计与技术的紧密配合。
            </p>
            <p>
              在过去的项目中，我与初创公司、本地商家和成长中的团队合作，帮助他们把想法变成清晰、快速且易用的网站。我专注于响应式布局、可访问性以及流畅的交互细节。
            </p>
            <p>
              工作之外，我喜欢研究新的前端技术、打磨设计系统，并把学到的东西分享给社区。
            </p>
          </div>

          <ul className="mt-8 flex flex-wrap gap-3">
            {highlights.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm font-medium"
              >
                <Icon className="size-4 text-primary" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
