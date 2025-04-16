<script lang="ts" setup>
// @ts-ignore-next-line
import { AisInfiniteHits } from 'vue-instantsearch/vue3/es'
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
        :refineNext="refineNext"
        :isLastPage="isLastPage"
      />
    </template>
  </AisInfiniteHits>
</template>
