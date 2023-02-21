<script lang="ts" setup>
import { AisRangeInput } from 'vue-instantsearch/vue3/es'
import Slider from 'primevue/slider'

type RangeChangeEvent = [number, number] // eslint-disable-line @typescript-eslint/no-unused-vars

const props = defineProps<{
  attribute: string
}>()

const rangeMin = ref(0)
const rangeMax = ref(4300)

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
          <span class="text-ashes-900">$ </span>{{ currentRefinement.min ?? rangeMin }}
        </BaseText>
        <BaseText size="m">
          <span class="text-ashes-900">$ </span>{{ currentRefinement.max ?? rangeMax }}
        </BaseText>
      </div>
      <div class="slider p-2">
        <Slider
          v-model="value"
          :range="true"
          :min="range.min"
          :max="range.max"
          @change="(event: RangeChangeEvent) => refine({min: event[0], max: event[1]})"
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
