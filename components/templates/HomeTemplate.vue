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
      <BaseText size="m" class="text-valhalla-100 mb-5">
        40940 results found in 15ms.
      </BaseText>
      <div class="items">
        <BaseCard v-for="i in 12" :key="i">
          <img src="https://images-na.ssl-images-amazon.com/images/I/412gpuRRA0L._.jpg" alt="" width="100" class="mb-3">
          <BaseTitle size="xs" class="mb-1 text-hot-pink-500 -900">
            Caroline's Treasures
          </BaseTitle>
          <BaseText
            size="m"
            class="text-valhalla-500 mb-1"
            style="
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            "
            title="VOSAREA 25pcs Disposable Ashtrays for Cigarettes Aluminum Foil Ashtrays Unbreakable Cigar Ashtrays for Cigarettes Outdoor Indoor Use"
          >
            VOSAREA 25pcs Disposable Ashtrays for Cigarettes Aluminum Foil Ashtrays Unbreakable Cigar Ashtrays for Cigarettes Outdoor Indoor Use
          </BaseText>
          <BaseText size="m" class="mb-1">
            <span class="text-ashes-900">$</span> <span class="text-valhalla-100">99</span>
          </BaseText>
          <SolidStarIcon class="text-ashes-900" height="14" width="14" />
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
