<script lang="ts" setup>
import { AisToggleRefinement } from 'vue-instantsearch/vue3/es'
const config = useRuntimeConfig()
const indexName = config.public.meilisearch.indexName

const sortingOptions = [
  { value: `${indexName}`, label: 'Featured' },
  { value: `${indexName}:price:asc`, label: 'Price: Low to High' },
  { value: `${indexName}:price:desc`, label: 'Price: High to Low' },
]
</script>

<template>
  <MeiliSearchProvider :index-name="indexName">
    <TheNavbar class="mb-5 shadow-l">
      <template #search>
        <MeiliSearchBar />
      </template>
    </TheNavbar>
    <div class="container mb-5">
      <div class="filters">
        <MeiliSearchFacetFilter attribute="gender" initial-sort-by="name" class="mb-5" />
        <MeiliSearchFacetFilter attribute="masterCategory" initial-sort-by="count" class="mb-5" />
        <MeiliSearchFacetFilter attribute="subCategory" initial-sort-by="count" class="mb-5" />
        <MeiliSearchFacetFilter attribute="baseColour" initial-sort-by="count" class="mb-5" />
        <MeiliSearchFacetFilter attribute="usage" initial-sort-by="count" class="mb-5" />
        <MeiliSearchRangeFilter attribute="price" class="mb-5" />
        <!-- <MeiliSearchRatingFilter attribute="rating_rounded" label="Rating" /> -->
      </div>
      <div class="results">
        <div class="mb-5 results-meta">
          <MeiliSearchStats />
          <MeiliSearchSorting :options="sortingOptions" />
        </div>
        <MeiliSearchLoadingProvider v-slot="{ isSearchStalled }" class="mb-5">
          <div v-show="isSearchStalled" style="height: 80vh; display: flex; flex-direction: column;">
            <LoadingIndicator class="m-auto" />
          </div>
          <MeiliSearchResults v-show="!isSearchStalled" />
        </MeiliSearchLoadingProvider>
      </div>
    </div>
  </MeiliSearchProvider>
</template>

<style src="~/assets/css/components/home.css" scoped />
