import { defineEventHandler } from 'h3'
import type { InstantMeiliSearchInstance } from '@meilisearch/instant-meilisearch'

export default defineEventHandler(async (event) => {
  const appConfig = useAppConfig()
  // InstantMeilisearch is binded into Nitro Context
  const meilisearch = event.context.meilisearch as InstantMeiliSearchInstance

  const { query } = await readBody(event)

  const results = await meilisearch.search([{
    indexName: appConfig.ecommerce.indexName,
    query
  }])

  return results
})
