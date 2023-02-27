<script lang="ts" setup>
const props = withDefaults(defineProps<{
  size?: 's' | 'xs'
  tag?: string
}>(), {
  size: 's',
  tag: 'div'
})

const size = toRef(props, 'size')

const textSizeClass = computed(() => {
  return size.value === 's'
    ? 'title-caps'
    : 'title-caps-xs'
})
</script>

<template>
  <component :is="tag" class="title" :class="[textSizeClass]">
    <slot name="default" />
  </component>
</template>
