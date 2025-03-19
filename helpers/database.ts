import { createClient } from '@supabase/supabase-js'
import type { Database } from '~/database.types.ts'

export const createSupabaseClient = () => {
  if (!process.env.NUXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    throw new Error('NUXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_KEY must be set')
  }

  return createClient<Database>(
    process.env.NUXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  )
}
