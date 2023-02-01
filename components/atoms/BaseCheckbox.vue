<script lang="ts" setup>
import { BaseCheckboxProps } from '~/types'

const props = defineProps<BaseCheckboxProps>()

defineEmits<{
 (e: 'update:modelValue', checked: boolean): void
}>()

const { name, label } = toRefs(props)
</script>

<template>
  <div class="input-group">
    <input
      :id="name"
      type="checkbox"
      :name="name"
      class="mr-2"
      :checked="modelValue"
      @update="$emit('update:modelValue', $event.target.checked)"
    >
    <label :for="name" class="body">{{ label }}</label>
  </div>
</template>

<style scoped>
.input-group {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
