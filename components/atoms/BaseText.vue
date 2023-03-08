<script lang="ts" setup>
const props = withDefaults(defineProps<{
  size?: 'l' | 'm' | 's' | 'xs'
  tag?: string
}>(), {
  size: 'l',
  tag: 'p'
})

const textSizeClass = computed(() => `body-${toRef(props, 'size').value}`)
</script>

<template>
  <component :is="tag" class="body" :class="textSizeClass">
    <slot name="default" />
  </component>
</template>
