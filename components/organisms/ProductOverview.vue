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

const addProductToCart = () => {
  alert('Added to cart 🎉')
}

const close = () => {
  emit('close')
}
</script>

<template>
  <BaseCard class="px-10 py-8 border-hot-pink-300">
    <div class="flex items-start justify-between">
      <div class="mb-4 text-valhalla-500 text-xl font-medium leading-none ">
        {{ product.productDisplayName }}
      </div>
      <button class="text-dodger-blue-500 text-xl font-medium leading-none" @click="close">&times;</button>
    </div>
    <BaseTitle size="xs" class="mb-2 text-hot-pink-500">
      {{ product.brandName }}
    </BaseTitle>
    <TwicImg
      :alt="product.productDisplayName"
      :src="optimizedImageUrl"
      :width="400"
      :height="533"
      class="mb-8"
    />
    <BaseText size="l" class="mb-4">
      <span class="text-ashes-900">$</span>
      <span class="text-valhalla-100">{{ formattedPrice }}</span>
    </BaseText>
    <BaseButton size="large" class="w-full" color="hot-pink" @click="addProductToCart">
      <span class="text-white">Add to Cart</span>
    </BaseButton>
  </BaseCard>
</template>
