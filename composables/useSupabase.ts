import { createClient } from "@supabase/supabase-js"
import type { Database } from "~/database.types.ts"

export const useSupabase = () => {
  const config = useRuntimeConfig()

  const supabase = createClient<Database>(config.public.supabase.url, config.public.supabase.key)

  return supabase
}
