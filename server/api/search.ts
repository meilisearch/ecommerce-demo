import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  // Meilisearch is binded into Nitro Context
  const { meilisearch } = event.context

  const { query } = await readBody(event)

  console.log(query)

  const results = await meilisearch.index('products').search(query)

  return { results }
})
