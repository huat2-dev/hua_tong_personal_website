import { createClient, type SupabaseClient } from "@supabase/supabase-js"

export type Feedback = {
  id: string
  name: string
  message: string
  rating: number
  created_at: string
}

let browserClient: SupabaseClient | null = null

function getSupabasePublicConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  return { url, key }
}

export function isSupabaseConfigured() {
  const { url, key } = getSupabasePublicConfig()
  return Boolean(url && key)
}

export function getSupabaseBrowserClient() {
  if (browserClient) {
    return browserClient
  }

  const { url, key } = getSupabasePublicConfig()

  if (!url || !key) {
    throw new Error(
      "Missing Supabase environment variables. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY).",
    )
  }

  browserClient = createClient(url, key)
  return browserClient
}
