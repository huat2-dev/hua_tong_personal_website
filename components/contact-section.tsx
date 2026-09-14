"use client"

import type React from "react"
import { useState } from "react"
import { Mail, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/brand-icons"

const socials = [
  { icon: GithubIcon, label: "GitHub", href: "#" },
  { icon: LinkedinIcon, label: "LinkedIn", href: "#" },
  { icon: XIcon, label: "X", href: "#" },
]

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
    e.currentTarget.reset()
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section id="contact" className="scroll-mt-16 bg-secondary/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">反馈</span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              有想法？聊聊吧
            </h2>
            <p className="mt-4 max-w-md text-base text-muted-foreground text-pretty">
              无论是新项目、合作机会，还是只想打个招呼，我都很乐意收到你的消息。
            </p>

            <div className="mt-8 space-y-4">
              <a
                href="mailto:hello@huatong.dev"
                className="inline-flex items-center gap-3 text-base font-medium transition-colors hover:text-primary"
              >
                <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Mail className="size-5" />
                </span>
                hello@huatong.dev
              </a>
            </div>

            <div className="mt-8">
              <p className="text-sm font-medium text-muted-foreground">在社交平台关注我</p>
              <div className="mt-3 flex gap-3">
                {socials.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex size-11 items-center justify-center rounded-2xl border border-border bg-card text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
                  >
                    <Icon className="size-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">姓名</Label>
                <Input id="name" name="name" required placeholder="你的名字" autoComplete="name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">邮箱</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">留言</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="告诉我你的想法……"
                  className="resize-none"
                />
              </div>
              <Button type="submit" size="lg" className="w-full rounded-full">
                {submitted ? (
                  <>
                    <Check className="size-4" />
                    已发送
                  </>
                ) : (
                  "发送消息"
                )}
              </Button>
              {submitted && (
                <p className="text-center text-sm text-primary" role="status">
                  谢谢！我会尽快回复你。
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
