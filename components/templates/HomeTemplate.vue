<script lang="ts" setup>
const items = reactive([
  { name: '1', label: 'Home & Kitchen', modelValue: true },
  { name: '2', label: 'Health & Household', modelValue: false },
  { name: '3', label: 'Beauty & Personal Care', modelValue: false }
])
</script>

<template>
  <TheNavbar class="shadow-l mb-5" />
  <div class="container">
    <div class="filters mr-5">
      <CheckboxList title="Category" :items="items" />
    </div>
    <div class="results">
      <BaseText class="text-valhalla-500 mb-5">
        40940 results found in 15ms.
      </BaseText>
      <div class="items">
        <BaseCard v-for="i in 12" :key="i">
          <img src="https://images-na.ssl-images-amazon.com/images/I/412gpuRRA0L._.jpg" alt="" width="100" class="mb-3">
          <BaseText class="mb-3 text-valhalla-900">
            Name of the product
          </BaseText>
          <BaseTitle class="mb-3 text-ashes-900">
            Some title
          </BaseTitle>
        </BaseCard>
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

.items {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}
</style>
