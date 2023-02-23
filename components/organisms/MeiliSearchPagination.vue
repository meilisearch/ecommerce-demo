<script lang="ts" setup>
import { AisPagination } from 'vue-instantsearch/vue3/es'
</script>

<template>
  <ais-pagination>
    <template
      #default="{
        currentRefinement,
        pages,
        refine
      }"
    >
      <BaseTitle>
        <span
          v-for="page in pages"
          :key="page"
        >
          <a
            href="#"
            :class="{'active': page === currentRefinement}"
            class="link"
            @click.prevent="refine(page)"
          >
            Page {{ page + 1 }}
          </a>
          <span
            v-if="page < (pages.length-1)"
            class="text-ashes-900"
          > &bull; </span>
        </span>
      </BaseTitle>
    </template>
  </ais-pagination>
</template>

<style scoped>
.link {
  text-decoration: none;
  color: var(--ashes-900);
}

.link.active {
  color: var(--dodger-blue-500);
}

.pages {
}
</style>
