<script lang="ts" setup>
import SolidStarIcon from '~/components/atoms/SolidStarIcon.vue'
import HalfSolidStarIcon from '~/components/atoms/HalfSolidStarIcon.vue'

const props = defineProps({
  rating: {
    type: Number,
    required: true,
    validator: (value: number) => (value >= 0 && value <= 5)
  }
})

const rating = toRef(props, 'rating')

const ratingText = computed(() => `${rating.value} out of 5`)

const solidStars = computed(() => Math.floor(rating.value))

const halfStars = computed(() => {
  // If there are 5 full stars OR if there's no decimal part
  if (solidStars.value === 5 || rating.value % 1 === 0) {
    return 0
  }
  return (rating.value % 1) >= 0.299 // JS % operator is weird
    ? 1
    : 0
})

const emptyStars = computed(() => (5 - solidStars.value - halfStars.value))
</script>

<template>
  <div :title="ratingText" class="star-rating">
    <SolidStarIcon v-for="i in solidStars" :key="i" height="14" width="14" class="star-icon" />
    <HalfSolidStarIcon v-if="halfStars === 1" height="14" width="14" class="star-icon" />
    <StarIcon v-for="i in emptyStars" :key="i" height="14" width="14" class="star-icon" />
  </div>
</template>

<style>
.star-icon path {
  /* fill: var(--ashes-900); */
  fill: var(--valhalla-100);
}
</style>

<style scoped>
.star-rating {
  display: flex;
}
</style>
