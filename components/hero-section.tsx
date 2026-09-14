import Image from "next/image"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-24 size-[26rem] rounded-full bg-primary/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-40 -left-24 size-[22rem] rounded-full bg-accent/20 blur-3xl"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="flex flex-col items-start">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-sm font-medium text-secondary-foreground">
            <Sparkles className="size-4 text-primary" />
            现已开放新项目合作
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            你好，我是 <span className="text-primary">Hua Tong</span>
          </h1>

          <p className="mt-4 font-display text-xl font-medium text-muted-foreground sm:text-2xl">
            Web Developer &amp; Designer
          </p>

          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground text-pretty">
            我打造美观且实用的网站，帮助企业成长。将清晰的设计与稳健的代码结合，交付真正有效的数字体验。
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button render={<a href="#projects" />} nativeButton={false} size="lg" className="rounded-full">
              查看作品
              <ArrowRight className="size-4" />
            </Button>
            <Button
              render={<a href="#contact" />}
              nativeButton={false}
              size="lg"
              variant="outline"
              className="rounded-full bg-transparent"
            >
              联系我
            </Button>
          </div>

          <dl className="mt-10 flex gap-8">
            <div>
              <dt className="text-sm text-muted-foreground">从业经验</dt>
              <dd className="font-display text-2xl font-bold">3 年</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">完成项目</dt>
              <dd className="font-display text-2xl font-bold">40+</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">客户好评</dt>
              <dd className="font-display text-2xl font-bold">100%</dd>
            </div>
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
          <div
            aria-hidden="true"
            className="absolute inset-0 -rotate-6 rounded-[2rem] bg-gradient-to-br from-primary/30 to-accent/30"
          />
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-2xl shadow-primary/10">
            <Image
              src="/images/headshot.png"
              alt="Hua Tong 的职业头像"
              width={640}
              height={720}
              priority
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
