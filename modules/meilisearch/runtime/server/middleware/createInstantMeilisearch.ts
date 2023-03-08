import { defineEventHandler } from 'h3'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler((event) => {
  const { host, searchApiKey, options } = useRuntimeConfig().public.meilisearch
  if (!event.context.meilisearch) {
    event.context.meilisearch = instantMeiliSearch(
      host,
      searchApiKey,
      options
    )
  }
})
