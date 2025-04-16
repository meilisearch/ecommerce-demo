<script lang="ts" setup>
import { AisInstantSearch, AisInstantSearchSsr, AisConfigure, AisStateResults } from 'vue-instantsearch/vue3/es'
import type { SearchParams } from '~/composables/useSearchParams'

// Define a type for the InstantSearch instance
interface InstantSearchHelper {
  helper: {
    search: () => void;
  };
  [key: string]: any;
}

const props = withDefaults(defineProps<{
  ssr?: boolean
  indexName: string
  initialQuery?: string
  searchParams?: SearchParams
}>(), {
  ssr: false,
  initialQuery: '',
  searchParams: () => ({})
})

const { ssr, indexName, initialQuery, searchParams } = toRefs(props)

// Store a reference to the InstantSearch instance with the proper type
const instantSearchInstance = ref<InstantSearchHelper | null>(null)

// Middleware function to capture the InstantSearch instance
const captureInstanceMiddleware = ({ instantSearchInstance: instance }: { instantSearchInstance: InstantSearchHelper }) => {
  return {
    onStateChange() {}, // Required hook, can be empty
    subscribe() {
      instantSearchInstance.value = instance
    },
    unsubscribe() {
      instantSearchInstance.value = null
    },
  }
}

// Array of middlewares to pass to the component
const middlewares = [captureInstanceMiddleware]

// Method to manually trigger a search refresh
const refresh = () => {
  if (instantSearchInstance.value && instantSearchInstance.value.helper) {
    instantSearchInstance.value.helper.search()
  }
}

// Expose the refresh method to parent components
defineExpose({ refresh })

// Register the component globally for use across the app
const nuxtApp = useNuxtApp()
nuxtApp.provide('meiliSearchRefresh', refresh)

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
    searchClient: instantMeilisearch.searchClient,
    middlewares: middlewares
  }
})
</script>

<template>
  <component :is="instantSearchComponent" v-bind="attributes">
    <!-- Add configure component inline -->
    <AisConfigure v-bind="searchParams" />

    <!-- Pass the content directly -->
    <slot name="default" />
  </component>
</template>
