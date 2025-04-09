<script lang="ts" setup>
import { AisSearchBox } from 'vue-instantsearch/vue3/es'
</script>

<template>
  <AisSearchBox>
    <template #default="{ currentRefinement, refine }">
      <SearchInput
        :value="currentRefinement"
        @input="refine($event.currentTarget.value)"
        @reset="refine('')"
      >
        <template #right>
          <button type="button" class="search-input-image">
            <ImageIcon class="image-icon" />
          </button>
        </template>
      </SearchInput>
    </template>
  </AisSearchBox>
</template>
