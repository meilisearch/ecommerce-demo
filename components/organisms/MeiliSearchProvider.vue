<script lang="ts" setup>
import { AisInstantSearch, AisInstantSearchSsr } from 'vue-instantsearch/vue3/es'

const props = withDefaults(defineProps<{
  ssr?: boolean
  indexName: string
  initialQuery?: string
}>(), {
  ssr: false,
  initialQuery: ''
})

const { ssr, indexName, initialQuery } = toRefs(props)

// if (ssr) {
//   const { instantsearch } = useServerRootMixin(indexName.value)

//   const { data: searchResults } = await useFetch('/api/search', {
//     method: 'POST',
//     body: { query: initialQuery.value }
//   })

//   // TODO: fix caveat with children components rendering using `instantsearch.findResultsState()`

//   instantsearch.hydrate({
//     [indexName.value]: searchResults.value
//   })
// }

const instantSearchComponent = computed(() => ssr.value ? AisInstantSearchSsr : AisInstantSearch)
const instantMeilisearch = useMeilisearch()

const attributes = computed(() => {
  // if (ssr.value) {
  //   return {
  //     [indexName.value]: {
  //       query: initialQuery.value
  //     }
  //   }
  // }
  return {
    indexName: indexName.value,
    searchClient: instantMeilisearch.searchClient
  }
})
</script>

<template>
  <component :is="instantSearchComponent" v-bind="attributes">
    <slot name="default" />
  </component>
</template>
