<script lang="ts" setup>
import data from '~/database/data.json'

const products = data.slice(0, 12)

const items = reactive([
  { name: '1', label: 'Home & Kitchen', modelValue: true },
  { name: '2', label: 'Health & Household', modelValue: false },
  { name: '3', label: 'Beauty & Personal Care', modelValue: false }
])

const sortingOptions = reactive([
  { value: '1', label: 'Recommended' },
  { value: '2', label: 'Price (asc)' },
  { value: '3', label: 'Price (desc)' }
])
</script>

<template>
  <TheNavbar class="mb-5 shadow-l" />
  <div class="container">
    <div class="mr-5 filters">
      <CheckboxList title="Category" :items="items" />
    </div>
    <div class="results">
      <div class="mb-5 results-meta">
        <BaseText size="m" class="mb-5 text-valhalla-100">
          40940 results found in 15ms.
        </BaseText>
        <BaseSelect :options="sortingOptions" />
      </div>
      <div class="items">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :name="product.title"
          :brand="product.brand"
          :price="product.price"
          :image-url="product.images[0]"
          :rating="product.rating"
          :reviews-count="product.reviews_count"
        />
      </div>
    </div>
  </div>
</template>

<style>
.container {
  max-width: 1024px;
  margin: auto;
  display: flex;
}

.filters {
  width: 25%;
}

.results {
  width: 75%;
}

.results-meta {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.items {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--size-5);
}
</style>
