<script lang="ts" setup>
import { AisPagination } from 'vue-instantsearch/vue3/es'
</script>

<template>
  <ais-pagination>
    <template
      #default="{
        currentRefinement,
        pages,
        refine,
        nbPages,
        isFirstPage,
        isLastPage
      }"
    >
      <BaseTitle v-if="!isFirstPage && !pages.includes(0)" tag="span">
        <a href="#" class="link" @click.prevent="refine(0)">
          Page 1
        </a>
        <span class="text-ashes-900"> &bull;<span v-if="!pages.includes(1)">&bull;&bull;</span> </span>
      </BaseTitle>
      <!-- Current page and 3 previous/next -->
      <BaseTitle
        v-for="(page, index) in pages"
        :key="page"
        tag="span"
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
          v-if="index < (pages.length-1)"
          class="text-ashes-900"
        > &bull; </span>
      </BaseTitle>
      <!-- Last page -->
      <BaseTitle v-if="!isLastPage && !pages.includes(nbPages-1)" tag="span">
        <span class="text-ashes-900"> &bull;<span v-if="!pages.includes(nbPages-2)">&bull;&bull;</span> </span>
        <a href="#" class="link" @click.prevent="refine(nbPages-1)">
          Page {{ nbPages }}
        </a>
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
