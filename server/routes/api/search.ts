import { defineEventHandler } from 'h3'
import type { InstantMeiliSearchInstance } from '@meilisearch/instant-meilisearch'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  // InstantMeilisearch is binded into Nitro Context
  const meilisearch = event.context.meilisearch as InstantMeiliSearchInstance

  const { query } = await readBody(event)

  const results = await meilisearch.search([{
    indexName: config.public.meilisearch.indexName,
    query
  }])

  return results
})
