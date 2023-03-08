<script lang="ts" setup>
interface Props {
  value: string
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Search...',
  value: ''
})

defineEmits(['input'])

const placeholder = toRef(props, 'placeholder')
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
    <button type="reset" class="search-input-reset">
      <XIcon class="x-icon" />
    </button>
  </form>
</template>

<style src="~/assets/css/search.css"></style>
