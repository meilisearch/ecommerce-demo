<script lang="ts" setup>
import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
import 'vue-slider-component/dist-css/vue-slider-component.css'
import 'vue-slider-component/theme/default.css'

const props = defineProps<{
  modelValue: [number, number]
  min: number
  max: number
}>()

defineEmits<{
 (e: 'update:model-value', value: [number, number]): void
}>()

const { modelValue, min, max } = toRefs(props)
</script>

<template>
  <VueSlider
    :model-value="modelValue"
    :min="min"
    :max="max"
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
    @change="$emit('update:model-value', ({ min: $event[0], max: $event[1] }))"
  />
</template>
