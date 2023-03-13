<script lang="ts" setup>
const props = withDefaults(defineProps<{
  value: boolean
  name: string
  label: string
  disabled?: boolean
}>(), {
  disabled: false
})

defineEmits<{
 (e: 'update:value', checked: boolean): void
}>()

const { name, label } = toRefs(props)
</script>

<template>
  <div class="input-group" :class="{ disabled: disabled }">
    <input
      :id="name"
      type="checkbox"
      :name="name"
      class="mr-2"
      :checked="value"
      :disabled="disabled"
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

 input,  label {
  cursor: pointer;
}

 input:disabled,  input:disabled + label {
  cursor: not-allowed;
}
</style>
