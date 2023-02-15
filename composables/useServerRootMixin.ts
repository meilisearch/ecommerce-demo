import { createServerRootMixin } from 'vue-instantsearch/vue3/es'

export default function useServerRootMixin (indexName: string) {
  const nuxtApp = useNuxtApp()
  const searchClient = useMeilisearch()

  const serverRootMixin = ref(createServerRootMixin({
    searchClient,
    indexName
  }))

  // Install SSR mixin
  nuxtApp.vueApp.mixin(serverRootMixin.value)
  // TODO: ensure mixin is only installed once

  return {
    instantsearch: serverRootMixin.value.data().instantsearch
  }
}
