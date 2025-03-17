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
          :id="product.id"
          :key="product.id"
          :name="product.productDisplayName"
          :brand="product.brandName"
          :price="product.price"
          :image-url="product.imageUrls.search ?? product.imageUrls.default"
          :base-colour="product.baseColour"
          :rating="5"
          :reviews-count="0"
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

