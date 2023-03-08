<script lang="ts" setup>
const props = defineProps<{
  value: boolean
  name: string
  label: string
}>()

defineEmits<{
 (e: 'update:value', checked: boolean): void
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
      :checked="value"
      @update="$emit('update:value', $event.target.checked)"
    >
    <label :for="name" class="body">
      <slot name="default">
        {{ label }}
      </slot>
    </label>
  </div>
</template>

<style scoped>
.input-group {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
