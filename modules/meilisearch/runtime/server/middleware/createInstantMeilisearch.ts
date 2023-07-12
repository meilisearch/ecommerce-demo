import { defineEventHandler } from 'h3'
import { createInstantMeilisearch } from '../../helpers'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler((event) => {
  const { host, searchApiKey, options } = useRuntimeConfig().public.meilisearch
  if (!event.context.meilisearch) {
    event.context.meilisearch = createInstantMeilisearch(host, searchApiKey, options)
  }
})
