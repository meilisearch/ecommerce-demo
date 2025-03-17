<script lang="ts" setup>
import { MeiliSearch } from 'meilisearch'
import type { Product } from '~/types'

const config = useRuntimeConfig()

const client = new MeiliSearch({
  host: config.public.meilisearch.host,
  apiKey: config.public.meilisearch.searchApiKey,
})

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

const similarProducts = ref<any[]>([])

onMounted(async () => {
  const similarDocuments = await  await client
      .index(config.public.meilisearch.indexName)
      .searchSimilarDocuments({
        id: product.value.id,
        limit: 3,
        embedder: 'image_desc_small',
        // filter: [`baseColour=${props.baseColour}`]
      });
  similarProducts.value = similarDocuments.hits.map((hit: any) => hit)
})

const getOptimizedImageUrl = (url: string) => {
  return url.replace('http://assets.myntassets.com/', '/kaggle-fashion-products/')
}

const optimizedImageUrl = computed(() => getOptimizedImageUrl(product.value.imageUrls.default))
</script>

<template>
  <BaseCard class="product-card">
    <TwicImg
      :alt="product.productDisplayName"
      :src="optimizedImageUrl"
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
      <div class="grid">
        <div v-for="product in similarProducts" :key="product.id">
          <TwicImg
            :key="product.id"
            :alt="product.productDisplayName"
            :src="getOptimizedImageUrl(product.imageUrls.default)"
            :width="50"
            :height="66"
            class="mb-5"
          />
        </div>
      </div>
      <!-- <div class="product-rating">
        <BaseText size="s" class="mr-1 text-valhalla-100">
          {{ rating }}
        </BaseText>
        <StarRating :rating="rating" class="my-auto mr-2 text-valhalla-100" />
        <BaseText size="xs" class="text-ashes-900">
          {{ reviewsCount }} reviews
        </BaseText>
      </div> -->
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

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
</style>
