<script lang="ts" setup>
const props = withDefaults(defineProps<{
  size?: 's' | 'xs'
}>(), {
  size: 's'
})

const size = toRef(props, 'size')

const textSizeClass = computed(() => {
  return size.value === 's'
    ? 'title-caps'
    : 'title-caps-xs'
})
</script>

<template>
  <div class="title" :class="[textSizeClass]">
    <slot name="default" />
  </div>
</template>
