<script lang="ts" setup>
import { AisRefinementList } from 'vue-instantsearch/vue3/es'

const props = defineProps<{
  attribute: string
}>()

const { attribute } = toRefs(props)
</script>

<template>
  <ais-refinement-list :attribute="attribute">
    <template #default="{ items, refine }">
      <BaseTitle class="mb-3 text-valhalla-100">
        {{ attribute }}
      </BaseTitle>
      <BaseCheckbox
        v-for="item in items"
        :key="item.value"
        :value="item.isRefined"
        :label="item.label"
        :name="item.value"
        @change="refine(item.value)"
      >
        <BaseText tag="span" size="m" class="text-valhalla-500">
          {{ item.label }} <BaseText tag="span" size="s" class="text-ashes-900">
            ({{ item.count.toLocaleString() }})
          </BaseText>
        </BaseText>
      </BaseCheckbox>
    </template>
  </ais-refinement-list>
</template>
