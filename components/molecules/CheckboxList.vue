<script lang="ts" setup>
import { BaseCheckboxProps } from '~/types'

const props = defineProps<{
  title: string
  items: Array<BaseCheckboxProps>
}>()

const { title, items } = toRefs(props)
</script>

<template>
  <div>
    <BaseTitle class="mb-3 text-valhalla-100">
      {{ title }}
    </BaseTitle>
    <BaseCheckbox
      v-for="item in items"
      :key="item.name"
      v-model="item.modelValue"
      :label="item.label"
      :name="item.name"
    />
  </div>
</template>
