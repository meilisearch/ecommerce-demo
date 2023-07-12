<script lang="ts" setup>
import { AisRefinementList } from 'vue-instantsearch/vue3/es'

type SortingOrder = 'isRefined' | 'count' | 'name'

const props = defineProps<{
  attribute: string
  sortBy: SortingOrder[]
}>()

const { attribute } = toRefs(props)

const searchInput = ref<string>('')

const refineFacet = (searchFn: any, inputValue: string) => {
  searchInput.value = inputValue
  searchFn(inputValue)
}
</script>

<template>
  <AisRefinementList
    :attribute="attribute"
    :searchable="true"
    :show-more="true"
    :sort-by="sortBy"
    operator="or"
  >
    <template
      #default="{ items, refine, searchForItems, isFromSearch, isShowingMore, canToggleShowMore, toggleShowMore }"
    >
      <BaseTitle class="mb-3 text-valhalla-100">
        {{ attribute }}
      </BaseTitle>
      <SearchInput
        class="mb-3"
        :value="searchInput"
        @input="refineFacet(searchForItems, $event.target.value)"
        @reset="refineFacet(searchForItems, '')"
      />
      <div class="mb-3">
        <BaseText v-if="isFromSearch && !items.length" tag="span" size="m" class="text-ashes-900">
          No results.
        </BaseText>
        <BaseCheckbox
          v-for="item in items"
          :key="item.value"
          :value="item.isRefined"
          :label="item.label"
          :name="item.value"
          :disabled="item.count === 0"
          @change="refine(item.value)"
        >
          <BaseText tag="span" size="m" :class="[ item.count ? 'text-valhalla-500' : 'text-ashes-900']">
            {{ item.label }} <BaseText tag="span" size="s" class="text-ashes-900">
              ({{ item.count.toLocaleString() }})
            </BaseText>
          </BaseText>
        </BaseCheckbox>
      </div>
      <BaseTitle v-show="canToggleShowMore" tag="span">
        <a
          href="#"
          class="link"
          @click.prevent="toggleShowMore"
        >
          {{ !isShowingMore ? 'Show more' : 'Show less' }}
        </a>
      </BaseTitle>
    </template>
  </AisRefinementList>
</template>

<style scoped>
.link {
  text-decoration: none;
  color: var(--ashes-900);
}
</style>
