<script lang="ts" setup>
import { AisInfiniteHits } from 'vue-instantsearch/vue3/es'
import type { Product } from '~/types'

const props = defineProps<{
  isProductSelected?: boolean
}>()

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
      <div
        class="grid gap-4 mb-10 transition-all duration-300"
        :class="{ 'grid-cols-4': !isProductSelected, 'grid-cols-3': isProductSelected }"
      >
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
