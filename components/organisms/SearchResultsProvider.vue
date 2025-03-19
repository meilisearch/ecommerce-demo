<script lang="ts" setup>
// @ts-ignore-next-line
import { AisInfiniteHits } from 'vue-instantsearch/vue3/es'

const { results } = useSearchStore()
</script>

<template>
  <AisInfiniteHits>
    <template
      #default="{
        items,
        refineNext,
        isLastPage,
      }"
    >
      <slot
        :items="items"
        :image-search-items="results"
        :refineNext="refineNext"
        :isLastPage="isLastPage"
      />
    </template>
  </AisInfiniteHits>
</template>
