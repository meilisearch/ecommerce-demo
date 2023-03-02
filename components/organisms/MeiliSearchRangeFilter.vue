<script lang="ts" setup>
import { AisRangeInput } from 'vue-instantsearch/vue3/es'
import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
import 'vue-slider-component/dist-css/vue-slider-component.css'
import 'vue-slider-component/theme/default.css'

interface Range {
  min: number
  max: number
}

const props = defineProps<{
  attribute: string
}>()

const minPrice = 0
const maxPrice = 1900

const { attribute } = toRefs(props)

const toValue = (currentValue: Range, boundaries: Range): [number, number] => {
  return [
    typeof currentValue.min === 'number' ? currentValue.min : boundaries.min,
    typeof currentValue.max === 'number' ? currentValue.max : boundaries.max
  ]
}
</script>

<template>
  <ais-range-input
    :attribute="attribute"
    :min="minPrice"
    :max="maxPrice"
  >
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
      <VueSlider
        :model-value="toValue(currentRefinement, range)"
        :min="range.min"
        :max="range.max"
        :lazy="true"
        tooltip="hover"
        class="body"
        :tooltip-style="{
          background: 'var(--ashes-600)',
          borderColor : 'var(--ashes-600)',
          color: 'var(--valhalla-500)',
          padding: 'var(--size-2)'
        }"
        :process-style="{ background: 'var(--dodger-blue-500)' }"
        :tooltip-formatter="(value: number) => `$ ${value}`"
        @change="refine({ min: $event[0], max: $event[1] })"
      />
    </template>
  </ais-range-input>
</template>

<style scoped>
.slider-labels {
  display: flex;
  justify-content: space-between;
}
</style>
