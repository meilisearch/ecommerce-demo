<script lang="ts" setup>
import { AisSortBy } from 'vue-instantsearch/vue3/es'

const selectOptions = reactive([
  {
    value: 'products',
    label: 'Featured'
  },
  {
    value: 'products:price:asc',
    label: 'Price: Low to High'
  },
  {
    value: 'products:price:desc',
    label: 'Price: High to Low'
  },
  {
    value: 'products:rating:desc',
    label: 'Rating: High to Low'
  }
])
</script>

<template>
  <AisSortBy :items="selectOptions">
    <template #default="{ items, refine }">
      <BaseSelect
        :options="items"
        @change="refine($event.target.value)"
      />
    </template>
  </AisSortBy>
</template>
