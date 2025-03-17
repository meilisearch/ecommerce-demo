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
    <TheNavbar class="mb-5 shadow-md">
      <template #search>
        <MeiliSearchBar />
      </template>
    </TheNavbar>
    <div class="flex mb-5 mx-10 gap-10">
      <div class="w-1/5 min-[280px]">
        <MeiliSearchFacetFilter attribute="gender" initial-sort-by="name" class="mb-5" />
        <MeiliSearchFacetFilter attribute="masterCategory" initial-sort-by="count" class="mb-5" />
        <MeiliSearchFacetFilter attribute="subCategory" initial-sort-by="count" class="mb-5" />
        <MeiliSearchFacetFilter attribute="baseColour" initial-sort-by="count" class="mb-5" />
        <MeiliSearchFacetFilter attribute="usage" initial-sort-by="count" class="mb-5" />
        <MeiliSearchRangeFilter attribute="price" class="mb-5" />
        <!-- <MeiliSearchRatingFilter attribute="rating_rounded" label="Rating" /> -->
      </div>
      <div class="w-4/5">
        <div class="mb-5 flex items-baseline justify-between">
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
