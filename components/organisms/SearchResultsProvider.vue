<script lang="ts" setup>
// @ts-ignore-next-line
import { AisInfiniteHits } from 'vue-instantsearch/vue3/es'
import type { Product } from '~/types'

const { results } = storeToRefs(useSearchStore())
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
        :items="results.length > 0 ? results : items"
        :refineNext="refineNext"
        :isLastPage="isLastPage"
      />
    </template>
  </AisInfiniteHits>
</template>
