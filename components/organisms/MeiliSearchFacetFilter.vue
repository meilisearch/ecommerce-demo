<script lang="ts" setup>
import { AisRefinementList } from 'vue-instantsearch/vue3/es'
import pluralize from 'pluralize'

type SortingOrder = 'isRefined' | 'count' | 'name'

const props = defineProps<{
  attribute: string
  initialSortBy: SortingOrder
}>()

const searchInput = ref<string>('')
const sortingOrder = ref<SortingOrder>(props.initialSortBy)

const refineFacet = (searchFn: any, inputValue: string) => {
  searchInput.value = inputValue
  searchFn(inputValue)
}

const sortingOptions: Array<{value: SortingOrder, label: string}> = [
  { value: 'count', label: 'By count' },
  { value: 'name', label: 'By name' }
]

const sortBy = computed(() => {
  return [
    'isRefined',
    sortingOrder.value
  ]
})

const attributePlural = computed(() => pluralize(props.attribute))
</script>

<template>
  <AisRefinementList
    :attribute="props.attribute"
    :searchable="true"
    :show-more="true"
    :sort-by="sortBy"
    operator="or"
  >
    <template
      #default="{ items, refine, searchForItems, isFromSearch, isShowingMore, canToggleShowMore, toggleShowMore }"
    >
      <div class="flex items-baseline">
        <BaseTitle class="mb-3 text-valhalla-100">
          {{ props.attribute }}
        </BaseTitle>
        <select v-model="sortingOrder" class="ml-auto text-ashes-900">
          <BaseText
            v-for="option in sortingOptions"
            :key="option.value"
            tag="option"
            :value="option.value"
            :selected="props.initialSortBy === option.value"
          >
            {{ option.label }}
          </BaseText>
        </select>
      </div>
      <SearchInput
        class="mb-3"
        :placeholder="`Search ${attributePlural}`"
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

select {
  border: 0;
}
</style>
