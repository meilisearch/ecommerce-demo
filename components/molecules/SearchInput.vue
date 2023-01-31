<script lang="ts" setup>
interface Props {
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Search something...'
})

const placeholder = toRef(props, 'placeholder')
</script>

<template>
  <form class="search-form">
    <input
      type="search"
      :placeholder="placeholder"
      class="input search-input"
    >
    <button type="reset" class="search-input-reset">
      <XIcon class="x-icon" />
    </button>
  </form>
</template>

<style src="~/assets/css/search.css"></style>
