<script lang="ts" setup>
const props = withDefaults(defineProps<{
  size?: 'l' | 'm' | 's' | 'xs'
}>(), {
  size: 'l'
})

const textSizeClass = computed(() => `body-${toRef(props, 'size').value}`)
</script>

<template>
  <p class="body" :class="textSizeClass">
    <slot name="default" />
  </p>
</template>
