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

const solidStars = computed(() => Math.floor(rating.value))

const halfStars = computed(() => {
  // If there are 5 full stars OR if there's no decimal part
  if (solidStars.value === 5 || rating.value % 1 === 0) {
    return 0
  }
  return (rating.value % 1) >= 0.3
    ? 1
    : 0
})

const emptyStars = computed(() => (5 - solidStars.value - halfStars.value))
</script>

<template>
  <div>
    <SolidStarIcon v-for="i in solidStars" :key="i" />
    <HalfSolidStarIcon v-if="halfStars === 1" />
    <StarIcon v-for="i in emptyStars" :key="i" />
  </div>
</template>
