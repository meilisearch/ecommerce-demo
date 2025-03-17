<script lang="ts" setup>
import type { Product } from '~/types'

const props = defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { product } = toRefs(props)

const formattedPrice = computed(() => {
  if (!product.value?.price) {
    return '-'
  }
  return formatToUSD(product.value.price)
})

const optimizedImageUrl = computed(() => product.value.imageUrls.default.replace('http://assets.myntassets.com/', '/kaggle-fashion-products/'))
</script>

<template>
  <div class="px-10 bg-white rounded-lg">
    <TwicImg
      :alt="product.productDisplayName"
      :src="optimizedImageUrl"
      :width="400"
      :height="533"
      class="mb-8"
    />
    <BaseTitle size="xs" class="mb-2 text-hot-pink-500">
      {{ product.brandName }}
    </BaseTitle>
    <BaseTitle size="s" class="mb-4 text-valhalla-500">
      {{ product.productDisplayName }}
    </BaseTitle>
    <BaseText size="l" class="mb-6">
      <span class="text-ashes-900">$</span>
      <span class="text-valhalla-100">{{ formattedPrice }}</span>
    </BaseText>
  </div>
</template>
