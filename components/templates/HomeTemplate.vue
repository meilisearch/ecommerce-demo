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
      <BaseText>40940 results found in 15ms.</BaseText>
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
</style>
