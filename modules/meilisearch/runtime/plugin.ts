import { ModuleRuntimeConfig } from '../types'
import { createInstantMeilisearch } from './helpers'

export default defineNuxtPlugin((nuxtApp) => {
  const { host, searchApiKey, options } = useRuntimeConfig().public.meilisearch as ModuleRuntimeConfig

  const meilisearchClient = createInstantMeilisearch(host, searchApiKey, options)

  nuxtApp.provide('meilisearch', meilisearchClient)
})
