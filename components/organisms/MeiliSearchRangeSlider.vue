<script lang="ts" setup>
import { AisRangeInput } from 'vue-instantsearch/vue3/es'
import Slider from 'primevue/slider'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { SliderSlideEndEvent } from 'primevue/slider'

const props = defineProps<{
  attribute: string
}>()

const rangeMin = ref(0)
const rangeMax = ref(1900)

const { attribute } = toRefs(props)

const value = ref([rangeMin.value, rangeMax.value])
</script>

<template>
  <ais-range-input
    :attribute="attribute"
    :min="rangeMin"
    :max="rangeMax"
  >
    <template #default="{ currentRefinement, range, refine }">
      <BaseTitle class="mb-3 text-valhalla-100">
        {{ attribute }}
      </BaseTitle>
      <div class="slider-labels text-valhalla-500">
        <BaseText size="m">
          <span class="text-ashes-900">$ </span>{{ currentRefinement.min ?? range.min }}
        </BaseText>
        <BaseText size="m">
          <span class="text-ashes-900">$ </span>{{ currentRefinement.max ?? range.max }}
        </BaseText>
      </div>
      <div class="slider p-2">
        <Slider
          v-model="value"
          :range="true"
          :min="range.min"
          :max="range.max"
          @slideend="({ value }: SliderSlideEndEvent) => refine({min: value[0], max: value[1]})"
        />
      </div>
    </template>
  </ais-range-input>
</template>

<style>
.slider-labels {
  display: flex;
  justify-content: space-between;
}

.slider .p-slider .p-slider-range {
  background: var(--ashes-900);
}

.slider .p-slider .p-slider-handle {
  border-color: var(--ashes-900);
}

.slider .p-slider:not(.p-disabled) .p-slider-handle:hover {
  background-color: var(--dodger-blue-500);
  border-color: var(--dodger-blue-500);
}
</style>
