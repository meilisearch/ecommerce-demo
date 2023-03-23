<script lang="ts" setup>
const props = withDefaults(defineProps<{
  isCurrent: boolean
  showSeparator: boolean
  separator: 'before' | 'after'
  hasGapSeparator: boolean
}>(), {
  showSeparator: true,
  separator: 'after',
  hasGapSeparator: false
})

// eslint-disable-next-line func-call-spacing
defineEmits<{
 (e: 'page-click'): void
}>()

const showSeparatorBefore = computed(() => props.showSeparator && props.separator === 'before')
const showSeparatorAfter = computed(() => props.showSeparator && props.separator === 'after')

const { isCurrent, hasGapSeparator } = toRefs(props)
</script>

<template>
  <BaseTitle tag="span">
    <span
      v-if="showSeparatorBefore"
      class="text-ashes-900"
    > &bull;<span v-if="hasGapSeparator">&bull;&bull;</span>&nbsp;</span>
    <a
      href="#"
      class="link"
      :class="{ 'active': isCurrent }"
      @click.prevent="$emit('page-click')"
    >
      <slot name="default" />
    </a>
    <span
      v-if="showSeparatorAfter"
      class="text-ashes-900"
    > &bull;<span v-if="hasGapSeparator">&bull;&bull;</span> </span>
  </BaseTitle>
</template>

<style scoped>
.link {
  text-decoration: none;
  color: var(--ashes-900);
}

.link.active {
  color: var(--dodger-blue-500);
}
</style>
