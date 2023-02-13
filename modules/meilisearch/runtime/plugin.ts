import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'

export default defineNuxtPlugin((nuxtApp) => {
  const { host, searchApiKey, options } = useRuntimeConfig().meilisearch

  const meilisearchClient = instantMeiliSearch(
    host,
    searchApiKey,
    options
  )

  nuxtApp.provide('meilisearch', meilisearchClient)
})
