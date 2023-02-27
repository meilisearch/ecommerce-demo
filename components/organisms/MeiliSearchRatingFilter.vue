<script lang="ts" setup>
import { AisRatingMenu } from 'vue-instantsearch/vue3/es'

const props = defineProps<{
  attribute: string
}>()

const { attribute } = toRefs(props)
</script>

<template>
  <AisRatingMenu
    :attribute="attribute"
    :max="5"
  >
    <template #default="{ items, refine }">
      <BaseTitle class="mb-3 text-valhalla-100">
        {{ attribute }}
      </BaseTitle>
      <a
        v-for="item in items"
        :key="item.value"
        class="link"
        :class="[item.isRefined ? 'text-dodger-500' : 'text-valhalla-500']"
        href="#"
        @click.prevent="refine(item.value)"
      >
        <span class="label">
          <StarRating :rating="Number(item.value)" />
          <BaseText
            tag="span"
            size="m"
            class="ml-1"
          >
            & Up
            <BaseText tag="span" size="s" class="text-ashes-900">
              ({{ item.count.toLocaleString() }})
            </BaseText>
          </BaseText>
        </span>
      </a>
    </template>
  </AisRatingMenu>
</template>

<style scoped>
.link {
  display: block;
  text-decoration: none;
  cursor: pointer;
}

.label {
  display: inline-flex;
  align-items: center;
}
</style>
