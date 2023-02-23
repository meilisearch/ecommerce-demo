import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import { ModuleRuntimeConfig } from '../types'

export default defineNuxtPlugin((nuxtApp) => {
  const { host, searchApiKey, options } = useRuntimeConfig().meilisearch as ModuleRuntimeConfig

  const meilisearchClient = instantMeiliSearch(
    host,
    searchApiKey,
    options
  )

  nuxtApp.provide('meilisearch', meilisearchClient)
})
