<script lang="ts" setup>
import XIcon from '~/components/atoms/XIcon.vue'

interface Props {
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Search something...'
})
</script>

<template>
  <form class="search-form">
    <input
      type="search"
      :placeholder="props.placeholder"
      class="input search-input"
    >
    <button type="reset" class="search-input-reset">
      <XIcon class="x-icon" />
    </button>
  </form>
</template>

<style src="~/assets/css/search.css"></style>
