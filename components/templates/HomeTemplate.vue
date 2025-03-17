<script lang="ts" setup>
import { AisToggleRefinement } from 'vue-instantsearch/vue3/es'

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
  isProductOverviewOpen.value = true
}

const handleProductOverviewClose = () => {
  isProductOverviewOpen.value = false
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
        <MeiliSearchLoadingProvider v-slot="{ isSearchStalled }" class="mb-5 relative">
          <div v-show="isSearchStalled" style="height: 80vh; display: flex; flex-direction: column;">
            <LoadingIndicator class="m-auto" />
          </div>
          <MeiliSearchResults v-show="!isSearchStalled" @product-select="handleProductSelect" />
          <Transition
            enter-active-class="transition ease-out duration-300"
            enter-from-class="transform translate-x-full"
            enter-to-class="transform translate-x-0"
            leave-active-class="transition ease-in duration-300"
            leave-from-class="transform translate-x-0"
            leave-to-class="transform translate-x-full"
          >
            <ProductOverview
              v-if="isProductOverviewOpen"
              :product="selectedProduct"
              @close="handleProductOverviewClose"
            />
          </Transition>
        </MeiliSearchLoadingProvider>
      </div>
    </div>
  </MeiliSearchProvider>
</template>

