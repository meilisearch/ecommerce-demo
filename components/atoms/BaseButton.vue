<script lang="ts" setup>
interface Props {
  color: 'dodger-blue' | 'hot-pink'
  secondary?: boolean
  size?: 'default' | 'small' | 'large'
}

const props = withDefaults(defineProps<Props>(), {
  color: 'hot-pink',
  secondary: false,
  size: 'default'
})

const { color, secondary, size } = toRefs(props)

const buttonColorClass = computed(() => `btn-${color.value}`)
const buttonSecondaryClass = computed(() => secondary.value ? 'btn-secondary' : '')
const buttonSizeClass = computed(() => {
  if (size.value === 'default') { return '' }
  return size.value === 'large'
    ? 'btn-lg'
    : 'btn-sm'
})
</script>

<template>
  <button
    class="btn"
    :class="[buttonColorClass, buttonSecondaryClass, buttonSizeClass]"
    type="button"
  >
    <slot name="default" />
  </button>
</template>

<style src="~/assets/css/button.css"></style>
