const skillGroups = [
  {
    category: "前端开发",
    skills: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    category: "设计工具",
    skills: ["Figma", "Photoshop"],
  },
  {
    category: "工具与平台",
    skills: ["WordPress", "Git"],
  },
]

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-16 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">能力</span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            技能与技术
          </h2>
          <p className="mt-4 text-base text-muted-foreground text-pretty">
            我在日常工作中经常使用的工具与技术栈。
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="rounded-3xl border border-border bg-card p-6 shadow-sm"
            >
              <h3 className="font-display text-lg font-semibold">{group.category}</h3>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:from-primary/20 hover:to-accent/20"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
