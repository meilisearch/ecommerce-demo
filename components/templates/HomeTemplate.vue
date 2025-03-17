<script lang="ts" setup>
import { AisToggleRefinement, AisInfiniteHits } from 'vue-instantsearch/vue3/es'

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

const config = useRuntimeConfig()
const indexName = config.public.meilisearch.indexName

const selectedProduct = ref<Product | null>(null)
const isProductOverviewOpen = ref(false)

const handleProductSelect = (product: Product) => {
  selectedProduct.value = product
}

const handleProductOverviewClose = () => {
  selectedProduct.value = null
}

const sortingOptions = [
  { value: `${indexName}`, label: 'Featured' },
  { value: `${indexName}:price:asc`, label: 'Price: Low to High' },
  { value: `${indexName}:price:desc`, label: 'Price: High to Low' },
]
</script>

<template>
  <MeiliSearchProvider :index-name="indexName">
    <TheNavbar class="mb-5 shadow-md">
      <template #search>
        <MeiliSearchBar />
      </template>
    </TheNavbar>
    <div class="flex mb-5 mx-10 gap-10">
      <div class="w-1/5 min-[280px]">
        <MeiliSearchFacetFilter attribute="gender" initial-sort-by="name" class="mb-5" />
        <MeiliSearchFacetFilter attribute="masterCategory" initial-sort-by="count" class="mb-5" />
        <MeiliSearchFacetFilter attribute="subCategory" initial-sort-by="count" class="mb-5" />
        <MeiliSearchFacetFilter attribute="baseColour" initial-sort-by="count" class="mb-5" />
        <MeiliSearchFacetFilter attribute="usage" initial-sort-by="count" class="mb-5" />
        <MeiliSearchRangeFilter attribute="price" class="mb-5" />
        <!-- <MeiliSearchRatingFilter attribute="rating_rounded" label="Rating" /> -->
      </div>
      <div class="w-4/5">
        <div class="mb-5 flex items-baseline justify-between">
          <MeiliSearchStats />
          <MeiliSearchSorting :options="sortingOptions" />
        </div>
        <MeiliSearchLoadingProvider v-slot="{ isSearchStalled }" class="mb-5 w-full">
          <div class="flex">
            <div v-show="isSearchStalled">
              <LoadingIndicator class="m-auto" />
            </div>
            <div v-show="!isSearchStalled" class="w-full">
              <AisInfiniteHits>
                <template
                  #default="{
                    items,
                    refineNext,
                    isLastPage,
                  }"
                >
                  <div
                    class="grid gap-5 mb-10 transition-all duration-300 "
                    :class="{ 'grid-cols-4': !selectedProduct, 'grid-cols-3': !!selectedProduct }"
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
                      @click="handleProductSelect(product)"
                      :class="{ 'border border-dodger-blue-500': selectedProduct?.id === product.id }"
                    />
                  </div>
                  <div v-if="!isLastPage">
                    <BaseButton size="large" color="dodger-blue" class="m-auto" @click="refineNext">
                      Show more results
                    </BaseButton>
                  </div>
                </template>
              </AisInfiniteHits>
            </div>
            <div v-if="selectedProduct" class="w-[400px] ml-5">
              <ProductOverview
                :product="selectedProduct"
                @close="handleProductOverviewClose"
                class="sticky top-6"
              />
            </div>
          </div>
        </MeiliSearchLoadingProvider>
      </div>
    </div>
  </MeiliSearchProvider>
</template>

