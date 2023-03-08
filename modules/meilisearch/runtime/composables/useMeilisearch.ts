import type { InstantMeiliSearchInstance } from '@meilisearch/instant-meilisearch'

export default function useMeilisearch () {
  const nuxtApp = useNuxtApp()
  const meilisearch: InstantMeiliSearchInstance = nuxtApp.$meilisearch
  return meilisearch
}
