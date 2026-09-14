import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    title: "电商商城",
    description: "为时尚品牌打造的全流程购物体验，包含商品筛选、购物车与流畅结账。",
    image: "/images/project-ecommerce.png",
    tags: ["Next.js", "Stripe", "Tailwind"],
  },
  {
    title: "餐厅官网",
    description: "为本地餐厅设计的品牌网站，突出菜单、氛围与在线订位功能。",
    image: "/images/project-restaurant.png",
    tags: ["React", "CMS", "Design"],
  },
  {
    title: "作品博客",
    description: "面向创作者的极简博客，注重阅读体验、排版与内容管理。",
    image: "/images/project-blog.png",
    tags: ["Next.js", "MDX", "SEO"],
  },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-16 bg-secondary/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">作品集</span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            我的项目
          </h2>
          <p className="mt-4 text-base text-muted-foreground text-pretty">
            精选近期的部分作品，涵盖电商、品牌与内容平台等不同类型。
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/10"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={`${project.title} 项目截图`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="mt-4 font-display text-xl font-semibold">{project.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground text-pretty">
                  {project.description}
                </p>

                <a
                  href="#contact"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-accent"
                >
                  查看项目
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
