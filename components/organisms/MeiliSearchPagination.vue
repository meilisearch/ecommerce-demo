<script lang="ts" setup>
import { AisPagination } from 'vue-instantsearch/vue3/es'
import PageNumber from '~/components/molecules/PageNumber.vue'
</script>

<template>
  <AisPagination>
    <template #default="{ currentRefinement, pages, refine, nbPages, isFirstPage, isLastPage }">
      <!-- First page -->
      <PageNumber
        v-if="!isFirstPage && !pages.includes(0)"
        :has-gap-separator="!pages.includes(1)"
        :is-current="currentRefinement === 0"
        @page-click="refine(0)"
      >
        Page 1
      </PageNumber>
      <!-- Current page and 3 previous/next -->
      <PageNumber
        v-for="(page, index) in pages"
        :key="page"
        :show-separator="index < (pages.length-1)"
        :is-current="currentRefinement === page"
        @page-click="refine(page)"
      >
        Page {{ page + 1 }}
      </PageNumber>
      <!-- Last page -->
      <PageNumber
        v-if="!isLastPage && !pages.includes(nbPages-1)"
        :has-gap-separator="!pages.includes(nbPages-2)"
        :is-current="currentRefinement === nbPages-1"
        @page-click="refine(nbPages-1)"
      >
        Page {{ nbPages }}
      </PageNumber>
    </template>
  </AisPagination>
</template>
