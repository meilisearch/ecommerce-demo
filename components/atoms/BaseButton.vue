<script lang="ts" setup>
interface Props {
  color: 'dodger-blue' | 'hot-pink'
  primary?: boolean
  size?: 'default' | 'small' | 'large'
}

const props = withDefaults(defineProps<Props>(), {
  color: 'hot-pink',
  primary: true,
  size: 'default'
})

const buttonColorClass = computed(() => `btn-${props.color}`)
const buttonPrimaryClass = computed(() => props.primary ? '' : 'btn-secondary')
const buttonSizeClass = computed(() => {
  if (props.size === 'default') { return '' }
  return props.size === 'large'
    ? 'btn-lg'
    : 'btn-sm'
})
</script>

<template>
  <button
    class="btn"
    :class="[buttonColorClass, buttonPrimaryClass, buttonSizeClass]"
    type="button"
  >
    <slot name="default" />
  </button>
</template>

<style src="~/assets/css/button.css"></style>
