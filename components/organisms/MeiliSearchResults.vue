<script lang="ts" setup>
import { AisHits } from 'vue-instantsearch/vue3/es'
</script>

<template>
  <AisHits>
    <template #default="{ items }">
      <div class="results-items">
        <ProductCard
          v-for="product in items"
          :key="product.id"
          :name="product.title"
          :brand="product.brand"
          :price="product.price"
          :image-url="product.images[0]"
          :rating="product.rating"
          :reviews-count="product.reviews_count"
        />
      </div>
    </template>
  </AisHits>
</template>

<style scoped>
.results-items {
  display: grid;
  grid-template-columns: repeat( auto-fill, minmax(200px, 1fr) );
  column-gap: calc(1.5 * var(--size-5));
  row-gap: calc(1.5 * var(--size-5));
}</style>
