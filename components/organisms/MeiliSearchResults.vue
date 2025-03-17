<script lang="ts" setup>
import { AisInfiniteHits } from 'vue-instantsearch/vue3/es'

interface Product {
  id: string
  productDisplayName: string
  brandName: string
  price: number | null
  imageUrls: {
    search?: string
    default: string
  }
  masterCategory: string
  subCategory: string
  gender: string
  baseColour: string
  usage: string
}

const emit = defineEmits<{
  (e: 'product-select', product: Product): void
}>()
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
          :brand="product.brandName"
          :price="product.price"
          :image-url="product.imageUrls.search ?? product.imageUrls.default"
          :rating="5"
          :reviews-count="0"
          class="cursor-pointer"
          @click="emit('product-select', product)"
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
