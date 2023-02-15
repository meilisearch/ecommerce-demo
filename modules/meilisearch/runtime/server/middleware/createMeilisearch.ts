import { defineEventHandler } from 'h3'
import { MeiliSearch } from 'meilisearch'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler((event) => {
  const { host, searchApiKey } = useRuntimeConfig().public.meilisearch
  if (!event.context.meilisearch) {
    event.context.meilisearch = new MeiliSearch({
      host,
      apiKey: searchApiKey
    })
  }
})
