<script lang="ts" setup>
import { AisInfiniteHits } from 'vue-instantsearch/vue3/es'
</script>

<template>
  <AisInfiniteHits>
    <template
      #default="{
        items,
        refineNext,
        isLastPage,
      }"
    >
      <div class="items mb-10">
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
      <div v-if="!isLastPage">
        <BaseButton size="large" color="dodger-blue" class="m-auto" @click="refineNext">
          Show more results
        </BaseButton>
      </div>
    </template>
  </AisInfiniteHits>
</template>

<style src="~/assets/css/components/results-grid.css" scoped />
