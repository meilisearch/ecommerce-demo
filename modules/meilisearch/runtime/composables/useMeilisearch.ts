import type { InstantMeiliSearchObject } from '@meilisearch/instant-meilisearch'

export default function useMeilisearch() {
  const nuxtApp = useNuxtApp()
  const meilisearch = nuxtApp.$meilisearch
  return meilisearch as InstantMeiliSearchObject
}
