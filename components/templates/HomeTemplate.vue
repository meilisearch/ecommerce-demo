<script lang="ts" setup>
import { AisInstantSearchSsr } from 'vue-instantsearch/vue3/es'

const items = reactive([
  { name: '1', label: 'Home & Kitchen', modelValue: true },
  { name: '2', label: 'Health & Household', modelValue: false },
  { name: '3', label: 'Beauty & Personal Care', modelValue: false }
])

const defaultQuery = ref('')

const initialUiState = reactive({
  products: {
    query: defaultQuery
  }
})

const { instantsearch } = useServerRootMixin('products')

const { data: searchResults } = await useFetch('/api/search', {
  method: 'POST',
  body: { query: defaultQuery }
})

instantsearch.hydrate({
  products: searchResults.value
})
</script>

<template>
  <ais-instant-search-ssr :initial-ui-state="initialUiState">
    <TheNavbar class="mb-5 shadow-l" />
    <div class="container mb-5">
      <div class="mr-5 filters">
        <CheckboxList title="Category" :items="items" />
      </div>
      <div class="results">
        <div class="mb-5 results-meta">
          <MeiliSearchStats />
          <MeiliSearchSorting />
        </div>
        <MeiliSearchResults />
      </div>
    </div>
  </ais-instant-search-ssr>
</template>

<style>
.container {
  margin-left: calc(2 * var(--size-5));
  margin-right: calc(2 * var(--size-5));
  display: flex;
}

.filters {
  width: 20%;
}

.results {
  width: 80%;
}

.results-meta {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.items {
  display: grid;
  grid-template-columns: repeat( auto-fill, minmax(200px, 1fr) );
  column-gap: calc(1.5 * var(--size-5));
  row-gap: calc(1.5 * var(--size-5));
}
</style>
