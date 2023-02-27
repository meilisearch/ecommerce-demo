<script lang="ts" setup>
import { AisSearchBox } from 'vue-instantsearch/vue3/es'
</script>

<template>
  <AisSearchBox>
    <template #default="{ currentRefinement, isSearchStalled, refine }">
      <SearchInput
        :value="currentRefinement"
        @input="refine($event.currentTarget.value)"
      />
      <span :hidden="!isSearchStalled">Loading...</span>
    </template>
  </AisSearchBox>
</template>
