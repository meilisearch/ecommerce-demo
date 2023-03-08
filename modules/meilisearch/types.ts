import type { InstantMeiliSearchOptions } from '@meilisearch/instant-meilisearch'

export interface ModuleOptions {
  enabled: boolean
  host: string
  searchApiKey: string
  options?: InstantMeiliSearchOptions
}

export type ModuleRuntimeConfig = ModuleOptions
