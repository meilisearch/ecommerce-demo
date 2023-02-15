<script lang="ts" setup>
import { AisStats } from 'vue-instantsearch/vue3/es'
</script>

<template>
  <ais-stats>
    <template #default="{ nbHits, processingTimeMS, query }">
      <BaseText size="m" class="text-valhalla-100">
        {{ nbHits }} results found in {{ processingTimeMS }}ms for <q>{{ query }}</q>
      </BaseText>
    </template>
  </ais-stats>
</template>
