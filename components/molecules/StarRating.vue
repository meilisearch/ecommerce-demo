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

const ratingText = computed(() => `${props.rating} out of 5`)

const solidStars = computed(() => Math.floor(props.rating))

const halfStars = computed(() => {
  // If there are 5 full stars OR if there's no decimal part
  if (solidStars.value === 5 || props.rating % 1 === 0) {
    return 0
  }
  return (props.rating % 1) >= 0.299 // JS % operator is weird
    ? 1
    : 0
})

const emptyStars = computed(() => (5 - solidStars.value - halfStars.value))
</script>

<template>
  <span :title="ratingText" class="star-rating">
    <SolidStarIcon v-for="i in solidStars" :key="i" height="14" width="14" class="star-icon" />
    <HalfSolidStarIcon v-if="halfStars === 1" height="14" width="14" class="star-icon" />
    <StarIcon v-for="i in emptyStars" :key="i" height="14" width="14" class="star-icon" />
  </span>
</template>

<style>
.star-icon path {
  fill: currentColor;
}
</style>

<style scoped>
.star-rating {
  display: inline-flex;
}
</style>
