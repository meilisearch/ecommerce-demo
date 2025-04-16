import type { InstantMeiliSearchOptions } from '@meilisearch/instant-meilisearch'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'

export const createInstantMeilisearch = (
  host: string,
  searchApiKey: string,
  options: InstantMeiliSearchOptions | undefined
) => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log(`Using Meilisearch host: ${host}\nSearch API key: ${searchApiKey}`)
  }
  const instantMeilisearch = instantMeiliSearch(
    host,
    searchApiKey,
    options
  )
  return instantMeilisearch
}
