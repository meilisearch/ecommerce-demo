<script lang="ts" setup>
import { AisHits } from 'vue-instantsearch/vue3/es'
import ProductCard from '~/components/organisms/ProductCard.vue'
</script>

<template>
  <!-- Insert template code here  -->
</template>

<style scoped>
.items {
  display: grid;
  grid-template-columns: repeat( auto-fill, minmax(200px, 1fr) );
  column-gap: calc(1.5 * var(--size-5));
  row-gap: calc(1.5 * var(--size-5));
}
</style>
