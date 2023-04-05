<script lang="ts" setup>
import { AisRangeInput } from 'vue-instantsearch/vue3/es'

interface Range {
  min: number
  max: number
}

const props = defineProps<{
  attribute: string
}>()

const { attribute } = toRefs(props)

const toValue = (currentValue: Range, boundaries: Range): [number, number] => {
  return [
    typeof currentValue.min === 'number' ? currentValue.min : boundaries.min,
    typeof currentValue.max === 'number' ? currentValue.max : boundaries.max
  ]
}
</script>

<template>
  <AisRangeInput :attribute="attribute">
    <template #default="{ currentRefinement, range, refine }">
      <BaseTitle class="mb-3 text-valhalla-100">
        {{ attribute }}
      </BaseTitle>
      <div class="slider-labels text-valhalla-500 mb-2">
        <BaseText size="m">
          <span class="text-ashes-900">$ </span>{{ currentRefinement.min ?? range.min }}
        </BaseText>
        <BaseText size="m">
          <span class="text-ashes-900">$ </span>{{ currentRefinement.max ?? range.max }}
        </BaseText>
      </div>
      <RangeSlider
        :model-value="toValue(currentRefinement, range)"
        :min="range.min"
        :max="range.max"
        @update:model-value="refine($event)"
      />
    </template>
  </AisRangeInput>
</template>

<style scoped>
.slider-labels {
  display: flex;
  justify-content: space-between;
}
</style>
