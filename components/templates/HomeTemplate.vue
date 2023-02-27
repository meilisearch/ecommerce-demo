<script lang="ts" setup>
</script>

<template>
  <MeiliSearchProvider index-name="products">
    <TheNavbar class="mb-5 shadow-l" />
    <div class="container mb-5">
      <div class="filters">
        <MeiliSearchListFilter attribute="category" class="mb-5" />
        <MeiliSearchListFilter attribute="brand" class="mb-5" />
        <MeiliSearchRangeSlider attribute="price" class="mb-5" />
        <MeiliSearchRatingFilter attribute="rating_rounded" />
      </div>
      <div class="results">
        <div class="mb-5 results-meta">
          <MeiliSearchStats />
          <MeiliSearchSorting />
        </div>
        <MeiliSearchResults class="mb-5" />
        <MeiliSearchPagination />
      </div>
    </div>
  </MeiliSearchProvider>
</template>

<style>
.container {
  margin-left: calc(2 * var(--size-5));
  margin-right: calc(2 * var(--size-5));
  display: flex;
}

.filters {
  width: min(20%, 280px);
  margin-right: calc(2 * var(--size-5));
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
