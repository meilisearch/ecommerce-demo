<script lang="ts" setup>
import { AisSearchBox } from 'vue-instantsearch/vue3/es'
</script>

<template>
  <ais-search-box>
    <template #default="{ currentRefinement, isSearchStalled, refine }">
      <SearchInput
        :value="currentRefinement"
        @input="refine($event.currentTarget.value)"
      />
      <span :hidden="!isSearchStalled">Loading...</span>
    </template>
  </ais-search-box>
</template>
