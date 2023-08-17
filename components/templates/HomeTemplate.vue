<script lang="ts" setup>
const appConfig = useAppConfig()

const indexName = appConfig.ecommerce.indexName

const sortingOptions = [
  { value: `${indexName}`, label: 'Featured' },
  { value: `${indexName}:price:asc`, label: 'Price: Low to High' },
  { value: `${indexName}:price:desc`, label: 'Price: High to Low' },
  { value: `${indexName}:rating:desc`, label: 'Rating: High to Low' }
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
        <MeiliSearchFacetFilter attribute="category" initial-sort-by="name" class="mb-5" />
        <MeiliSearchFacetFilter attribute="brand" initial-sort-by="count" class="mb-5" />
        <MeiliSearchRangeFilter attribute="price" class="mb-5" />
        <MeiliSearchRatingFilter attribute="rating_rounded" label="Rating" />
      </div>
      <div class="results">
        <div class="mb-5 results-meta">
          <MeiliSearchStats />
          <MeiliSearchSorting :options="sortingOptions" />
        </div>
        <MeiliSearchResults class="mb-5" />
      </div>
    </div>
  </MeiliSearchProvider>
</template>

<style src="~/assets/css/components/home.css" scoped />
