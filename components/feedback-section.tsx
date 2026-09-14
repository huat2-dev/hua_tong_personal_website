"use client"

import type React from "react"
import { useCallback, useEffect, useState } from "react"
import { Check, Loader2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  getSupabaseBrowserClient,
  isSupabaseConfigured,
  type Feedback,
} from "@/lib/supabase"
import { cn } from "@/lib/utils"

function formatTimestamp(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }

  return date.toLocaleString("zh-CN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function StarRatingDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} / 5 星`}>
      {Array.from({ length: 5 }, (_, index) => {
        const filled = index < rating
        return (
          <Star
            key={index}
            className={cn(
              "size-4",
              filled ? "fill-primary text-primary" : "text-border",
            )}
            aria-hidden="true"
          />
        )
      })}
    </div>
  )
}

function upsertById(list: Feedback[], item: Feedback) {
  if (list.some((entry) => entry.id === item.id)) {
    return list
  }

  return [item, ...list].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  )
}

function isFeedbackRow(value: unknown): value is Feedback {
  if (!value || typeof value !== "object") {
    return false
  }

  const row = value as Record<string, unknown>
  return (
    typeof row.id === "string" &&
    typeof row.name === "string" &&
    typeof row.message === "string" &&
    typeof row.rating === "number" &&
    typeof row.created_at === "string"
  )
}

export function FeedbackSection() {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [items, setItems] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const configured = isSupabaseConfigured()

  const fetchFeedback = useCallback(async () => {
    if (!configured) {
      setLoadError("尚未配置 Supabase 环境变量，暂时无法加载反馈。")
      setLoading(false)
      return
    }

    setLoading(true)
    setLoadError(null)

    try {
      const supabase = getSupabaseBrowserClient()
      const { data, error } = await supabase
        .from("feedback")
        .select("id, name, message, rating, created_at")
        .order("created_at", { ascending: false })

      if (error) {
        throw error
      }

      setItems((data ?? []) as Feedback[])
    } catch (error) {
      const description =
        error instanceof Error ? error.message : "加载反馈失败，请稍后重试。"
      setLoadError(description)
    } finally {
      setLoading(false)
    }
  }, [configured])

  useEffect(() => {
    void fetchFeedback()
  }, [fetchFeedback])

  useEffect(() => {
    if (!configured) {
      return
    }

    const supabase = getSupabaseBrowserClient()
    const channel = supabase
      .channel("public:feedback")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "feedback" },
        (payload) => {
          if (isFeedbackRow(payload.new)) {
            setItems((current) => upsertById(current, payload.new as Feedback))
          }
        },
      )
      .subscribe()

    return () => {
      void supabase.removeChannel(channel)
    }
  }, [configured])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitError(null)
    setSuccessMessage(null)

    if (!configured) {
      setSubmitError("尚未配置 Supabase 环境变量，无法提交反馈。")
      return
    }

    const form = event.currentTarget
    const formData = new FormData(form)
    const trimmedName = String(formData.get("name") ?? "").trim()
    const trimmedMessage = String(formData.get("message") ?? "").trim()

    if (!trimmedName || !trimmedMessage) {
      setSubmitError("请填写姓名和反馈内容。")
      return
    }

    if (rating < 1 || rating > 5) {
      setSubmitError("请选择 1 到 5 星评分。")
      return
    }

    setSubmitting(true)

    try {
      const supabase = getSupabaseBrowserClient()
      const { data, error } = await supabase
        .from("feedback")
        .insert({ name: trimmedName, message: trimmedMessage, rating })
        .select("id, name, message, rating, created_at")
        .single()

      if (error) {
        throw error
      }

      if (data) {
        setItems((current) => upsertById(current, data as Feedback))
      }

      form.reset()
      setRating(0)
      setHoverRating(0)
      setSuccessMessage("感谢你的反馈！已成功提交。")
    } catch (error) {
      const description =
        error instanceof Error ? error.message : "提交失败，请稍后重试。"
      setSubmitError(description)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="feedback" className="relative scroll-mt-16 bg-secondary/40 py-20 sm:py-28">
      <span id="contact" className="absolute -top-16" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              反馈
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              留下你的想法
            </h2>
            <p className="mt-4 max-w-md text-base text-muted-foreground text-pretty">
              欢迎分享使用体验、合作建议或任何想法。你的反馈会立即出现在下方列表中。
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="feedback-name">姓名</Label>
                <Input
                  id="feedback-name"
                  name="name"
                  required
                  placeholder="你的名字"
                  autoComplete="name"
                  disabled={submitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback-message">反馈内容</Label>
                <Textarea
                  id="feedback-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="告诉我你的想法……"
                  className="resize-none"
                  disabled={submitting}
                />
              </div>

              <div className="space-y-2">
                <Label id="feedback-rating-label">评分</Label>
                <div
                  role="radiogroup"
                  aria-labelledby="feedback-rating-label"
                  className="flex items-center gap-1"
                >
                  {Array.from({ length: 5 }, (_, index) => {
                    const value = index + 1
                    const active = (hoverRating || rating) >= value
                    return (
                      <button
                        key={value}
                        type="button"
                        role="radio"
                        aria-checked={rating === value}
                        aria-label={`${value} 星`}
                        disabled={submitting}
                        onMouseEnter={() => setHoverRating(value)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(value)}
                        className="rounded-lg p-1 text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50"
                      >
                        <Star
                          className={cn(
                            "size-7",
                            active ? "fill-primary text-primary" : "text-border",
                          )}
                        />
                      </button>
                    )
                  })}
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full rounded-full"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    提交中…
                  </>
                ) : successMessage ? (
                  <>
                    <Check className="size-4" />
                    已提交
                  </>
                ) : (
                  "提交反馈"
                )}
              </Button>

              {successMessage && (
                <p className="text-center text-sm text-primary" role="status">
                  {successMessage}
                </p>
              )}
              {submitError && (
                <p className="text-center text-sm text-destructive" role="alert">
                  {submitError}
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="font-display text-xl font-semibold">最近反馈</h3>

          {loading && (
            <div
              className="mt-6 flex items-center gap-2 text-sm text-muted-foreground"
              role="status"
            >
              <Loader2 className="size-4 animate-spin" />
              正在加载反馈…
            </div>
          )}

          {!loading && loadError && (
            <div
              className="mt-6 rounded-3xl border border-destructive/30 bg-card p-6 text-sm text-destructive"
              role="alert"
            >
              {loadError}
            </div>
          )}

          {!loading && !loadError && items.length === 0 && (
            <p className="mt-6 text-sm text-muted-foreground">
              还没有反馈，来做第一个留言的人吧。
            </p>
          )}

          {!loading && items.length > 0 && (
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="rounded-3xl border border-border bg-card p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-display text-lg font-semibold">{item.name}</p>
                    <StarRatingDisplay rating={item.rating} />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
                    {item.message}
                  </p>
                  <p className="mt-4 text-xs text-muted-foreground">
                    {formatTimestamp(item.created_at)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
