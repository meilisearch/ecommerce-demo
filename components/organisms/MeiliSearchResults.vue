<script lang="ts" setup>
import { AisHits } from 'vue-instantsearch/vue3/es'
</script>

<template>
  <AisHits>
    <template #default="{ items }">
      <div class="items">
        <ProductCard
          v-for="product in items"
          :key="product.uniq_id"
          :name="product.name"
          :brand="product.brand"
          :price="product.price"
          :image-url="product.image_url.split('|')[0]"
          :rating="product.rating"
          :reviews-count="product.reviews_count"
        />
      </div>
    </template>
  </AisHits>
</template>

<style src="~/assets/css/components/results-grid.css" scoped />
