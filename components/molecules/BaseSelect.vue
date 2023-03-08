<script lang="ts" setup>
const props = defineProps<{
  value?: string
  options: Array<{
    value: string
    label: string
  }>
}>()

defineEmits(['change'])

const options = toRef(props, 'options')
</script>

<template>
  <div class="select-group">
    <select class="pr-5 input" @change="$emit('change', $event)">
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :selected="option.value === value"
      >
        {{ option.label }}
      </option>
    </select>
    <SelectArrow class="mr-4 select-arrow" />
  </div>
</template>

<style src="~/assets/css/input.css"></style>

<style scoped>
.select-group {
  position: relative;
  display: inline-block;
}

.select-group select {
  -moz-appearance:none; /* Firefox */
  -webkit-appearance:none; /* Safari and Chrome */
  appearance:none;
  padding-right: calc(var(--size-4) + var(--size-2) + 20px);
}

.select-group .select-arrow {
  display: inline;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0%, -50%);
}
</style>
