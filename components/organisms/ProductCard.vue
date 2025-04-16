<script lang="ts" setup>
import type { Product } from '~/types'

// import { TwicImg } from '@twicpics/components/vue3'

const props = defineProps<{
  product: Product
}>()

const { product } = toRefs(props)

const formattedPrice = computed(() => {
  if (product.value.price === null) {
    return '-';
  }
  return formatToUSD(product.value.price);
})
</script>

<template>
  <BaseCard class="product-card">
    <TwicImg
      :alt="product.productDisplayName"
      :src="getOptimizedImageUrl(product.imageUrls.default)"
      :width="250"
      :height="333"
      class="mb-5"
    />
    <div class="px-5 pb-5">
      <BaseTitle size="xs" class="mb-1 text-hot-pink-500 -900">
        {{ product.brandName }}
      </BaseTitle>
      <BaseText
        size="m"
        class="mb-2 text-valhalla-500 product-name"
        :title="product.productDisplayName"
      >
        {{ product.productDisplayName }}
      </BaseText>
      <BaseText size="l" class="mb-2">
        <span class="text-ashes-900">$</span> <span class="text-valhalla-100">{{ formattedPrice }}</span>
      </BaseText>
    </div>
  </BaseCard>
</template>

<style scoped>
.product-card {
  max-width: 250px;
  transition: transform ease-in-out 150ms;
}

.product-card:hover {
  box-shadow: 0px 0px 14px 8px rgba(77, 90, 125, 0.1), 0px 4px 66px rgba(77, 90, 125, 0.04);
  transform: translateY(-5px);
}

.product-name {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.product-rating {
  display: flex;
  align-items: baseline;
}
</style>
