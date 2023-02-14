<script lang="ts" setup>
import HomeTemplate from '~/components/templates/HomeTemplate.vue'

const meilisearch = useMeilisearch()
</script>

<template>
  <HomeTemplate
    :search-client="meilisearch"
    index-name="products"
  />
</template>
