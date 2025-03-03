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
          :key="product.id"
          :name="product.productDisplayName"
          brand="product.brand"
          :price="0"
          :image-url="product.imageUrl"
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
