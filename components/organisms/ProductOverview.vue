<script lang="ts" setup>
import type { Product } from '~/types'
import { MeiliSearch } from 'meilisearch'

const config = useRuntimeConfig()

const client = new MeiliSearch({
  host: config.public.meilisearch.host,
  apiKey: config.public.meilisearch.searchApiKey,
})

const props = defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'product-selected', product: Product): void
}>()

const { product: newProduct } = toRefs(props)

const formattedPrice = computed(() => {
  if (!newProduct.value?.price) {
    return '-'
  }
  return formatToUSD(newProduct.value.price)
})

const optimizedImageUrl = computed(() => newProduct.value.imageUrls.default.replace('http://assets.myntassets.com/', '/kaggle-fashion-products/'))

const addProductToCart = () => {
  alert('Added to cart 🎉')
}

const close = () => {
  emit('close')
}

const similarProducts = ref<Product[]>([])

watch(newProduct, async () => {
  similarProducts.value = []
  const similarDocuments = await client
      .index(config.public.meilisearch.indexName)
      .searchSimilarDocuments({
        id: newProduct.value.id,
        limit: 3,
        embedder: 'image_desc_small',
        // filter: [`baseColour=${props.baseColour}`]
      });
  similarProducts.value = similarDocuments.hits.map((hit: any) => hit)
})

const handleProductClick = (product: Product) => {
  emit('product-selected', product)
}
</script>

<template>
  <div>
    <BaseCard class="px-10 py-8 border-hot-pink-300">
      <div class="flex items-start justify-between space-x-4">
        <div class="mb-4 text-valhalla-500 text-xl font-medium leading-none ">
          {{ newProduct.productDisplayName }}
        </div>
        <button class="text-dodger-blue-500 text-xl font-medium leading-none" @click="close">&times;</button>
      </div>
      <BaseTitle size="xs" class="mb-2 text-hot-pink-500">
        {{ newProduct.brandName }}
      </BaseTitle>
      <TwicImg
        :alt="newProduct.productDisplayName"
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
    <div></div>
    <div class="uppercase font-semibold font-title text-ashes-900 text-sm mt-8 mb-4">
      You might also like
    </div>
    <div v-if="similarProducts.length > 0" class="space-y-4">
      <BaseCard v-for="product in similarProducts" :key="product.id" class="cursor-pointer" @click="handleProductClick(product)">
        <div class="flex space-x-4 items-center px-4">
          <div class="bg-red-100 min-w-[50px]">
            <TwicImg
              :key="product.id"
              :alt="product.productDisplayName"
              :src="getOptimizedImageUrl(product.imageUrls.default)"
              :width="50"
              :height="66"
              />
          </div>
          <div class="py-4 leading-none">
            {{ product.productDisplayName }}
          </div>
        </div>
      </BaseCard>
    </div>
    <div v-else>
      <div class="text-ashes-500">
        Loading...
      </div>
    </div>
  </div>
</template>
