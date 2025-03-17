<script lang="ts" setup>
import { ref } from 'vue'

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

const props = defineProps<{
  product: Product | null
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

const optimizedImageUrl = computed(() => {
  if (!product.value?.imageUrls.search) return product.value?.imageUrls.default
  return product.value.imageUrls.search
})
</script>

<template>
  <div
    v-if="product"
    class="absolute top-0 right-0 w-1/2 min-w-[500px] h-[80vh] bg-white shadow-lg z-50 overflow-y-auto"
  >
    <div class="sticky top-0 p-6 bg-white border-b flex justify-end z-[51]">
      <BaseButton
        color="dodger-blue"
        class="text-2xl p-2 leading-none"
        @click="emit('close')"
      >
        ✕
      </BaseButton>
    </div>
    <div class="p-8 flex flex-col items-center">
      <TwicImg
        :alt="product.productDisplayName"
        :src="product.imageUrls.search ?? product.imageUrls.default"
        :width="400"
        :height="533"
        class="mb-8"
      />
      <div class="max-w-[400px] w-full">
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

        <div class="border-t pt-6">
          <div class="mb-4 last:mb-0">
            <BaseText size="s" class="text-ashes-900">Category</BaseText>
            <BaseText size="m" class="text-valhalla-500">{{ product.masterCategory }} / {{ product.subCategory }}</BaseText>
          </div>
          <div class="mb-4 last:mb-0">
            <BaseText size="s" class="text-ashes-900">Gender</BaseText>
            <BaseText size="m" class="text-valhalla-500">{{ product.gender }}</BaseText>
          </div>
          <div class="mb-4 last:mb-0">
            <BaseText size="s" class="text-ashes-900">Color</BaseText>
            <BaseText size="m" class="text-valhalla-500">{{ product.baseColour }}</BaseText>
          </div>
          <div class="mb-4 last:mb-0">
            <BaseText size="s" class="text-ashes-900">Usage</BaseText>
            <BaseText size="m" class="text-valhalla-500">{{ product.usage }}</BaseText>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-overview {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  min-width: 500px;
  height: 100vh;
  background: white;
  box-shadow: -4px 0 24px rgba(77, 90, 125, 0.1);
  z-index: 50;
  overflow-y: auto;
}

.header {
  position: sticky;
  top: 0;
  padding: 1.5rem;
  background: white;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
  z-index: 51;
}

.close-button {
  font-size: 1.5rem;
  padding: 0.5rem;
  line-height: 1;
}

.content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-info {
  max-width: 400px;
  width: 100%;
}

.details {
  border-top: 1px solid #f0f0f0;
  padding-top: 1.5rem;
}

.detail-item {
  margin-bottom: 1rem;
}

.detail-item:last-child {
  margin-bottom: 0;
}
</style>
