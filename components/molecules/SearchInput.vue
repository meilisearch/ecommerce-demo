<script lang="ts" setup>
interface Props {
  value: string
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Search...',
  value: ''
})

defineEmits(['input', 'reset'])

const placeholder = toRef(props, 'placeholder')
const slots = useSlots()
const hasRightSlot = computed(() => !!slots.right)
</script>

<template>
  <form class="search-form">
    <input
      type="search"
      :placeholder="placeholder"
      :value="value"
      class="input search-input"
      @input="$emit('input', $event)"
    >
    <button
      type="reset"
      class="search-input-reset"
      :class="{ 'has-right-slot': hasRightSlot }"
      @click="$emit('reset')"
    >
      <XIcon class="x-icon" />
    </button>
    <!-- Right slot for custom buttons -->
    <template v-if="slots.right">
      <slot name="right"></slot>
    </template>
  </form>
</template>

<style src="~/assets/css/search.css"></style>
