import type { InstantMeiliSearchOptions } from '@meilisearch/instant-meilisearch'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'

export const createInstantMeilisearch = (
  host: string,
  searchApiKey: string,
  options: InstantMeiliSearchOptions | undefined
) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Using Meilisearch host: ${host}\nSearch API key: ${searchApiKey}`)
  }
  return instantMeiliSearch(
    host,
    searchApiKey,
    options
  )
}
