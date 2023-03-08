<script lang="ts" setup>
import { AisSortBy } from 'vue-instantsearch/vue3/es'

const props = defineProps<{
  options: Array<{
    value: string
    label: string
  }>
}>()

const { options } = toRefs(props)
</script>

<template>
  <AisSortBy :items="options">
    <template #default="{ items, refine }">
      <BaseSelect
        :options="items"
        @change="refine($event.target.value)"
      />
    </template>
  </AisSortBy>
</template>
