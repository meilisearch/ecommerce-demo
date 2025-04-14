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
  <form class="flex relative w-full h-11">
    <!-- Search icon -->
    <div class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ashes-600 pointer-events-none">
      <svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.6115 1C5.30323 1 1 5.2082 1 10.3993C1 15.5904 5.30323 19.7986 10.6115 19.7986C12.8819 19.7986 14.9684 19.0288 16.613 17.7415L19.7371 20.7886L19.8202 20.8586C20.1102 21.0685 20.5214 21.0446 20.7839 20.7873C21.0726 20.5043 21.072 20.0459 20.7825 19.7636L17.6952 16.7523C19.2649 15.0794 20.2231 12.8488 20.2231 10.3993C20.2231 5.2082 15.9198 1 10.6115 1ZM10.6116 2.44781C15.1023 2.44781 18.7427 6.00783 18.7427 10.3993C18.7427 14.7909 15.1023 18.3509 10.6116 18.3509C6.12089 18.3509 2.48047 14.7909 2.48047 10.3993C2.48047 6.00783 6.12089 2.44781 10.6116 2.44781Z" fill="currentColor" stroke="currentColor"/>
      </svg>
    </div>

    <input
      type="search"
      :placeholder="placeholder"
      :value="value"
      class="flex-1 max-w-full pl-10 pr-8 py-3 rounded-lg bg-white border border-ashes-900 text-valhalla-300 text-sm font-sans appearance-none transition-colors duration-300 placeholder:text-ashes-900 hover:border-dodger-blue-500 focus:border-dodger-blue-500 focus:ring-4 focus:ring-dodger-blue-500/20 focus:outline-none [&::-webkit-search-cancel-button]:appearance-none"
      @input="$emit('input', $event)"
    >

    <button
      v-show="value"
      type="reset"
      class="absolute flex items-center justify-center w-5 h-5 rounded-full top-1/2 -translate-y-1/2 cursor-pointer bg-transparent border-none text-ashes-900 hover:text-valhalla-100 focus:outline-none focus-visible:text-valhalla-100 transition-colors duration-300"
      :class="{ 'right-14': hasRightSlot, 'right-4': !hasRightSlot }"
      @click="$emit('reset')"
    >
      <XIcon class="w-4 h-4" />
    </button>

    <!-- Right slot for custom buttons -->
    <div v-if="slots.right" class="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
      <slot name="right"></slot>
    </div>
  </form>
</template>
