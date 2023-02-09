<script lang="ts" setup>
// import { TwicImg } from '@twicpics/components/vue3'

const props = defineProps<{
  name: string
  brand: string
  price: number | null // some prices are null in our dataset
  rating: number
  reviewsCount: number
  imageUrl: string
}>()

const { name, brand, price, rating, reviews, imageUrl } = toRefs(props)

const formattedPrice = computed(() => Number.isNaN(price) ? '-' : price)

const optimizedImageUrl = computed(() => imageUrl.value.replace('https://images-na.ssl-images-amazon.com/images/', '/product-images/'))
</script>

<template>
  <BaseCard class="product-card">
    <TwicImg :src="optimizedImageUrl" class="mb-3" />
    <BaseTitle size="s" class="mb-1 text-hot-pink-500 -900">
      {{ brand }}
    </BaseTitle>
    <BaseText
      size="m"
      class="mb-2 text-valhalla-500"
      style="
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      "
      :title="name"
    >
      {{ name }}
    </BaseText>
    <BaseText size="l" class="mb-2">
      <span class="text-ashes-900">$</span> <span class="text-valhalla-100">{{ formattedPrice }}</span>
    </BaseText>
    <div class="product-rating">
      <BaseText size="s" class="mr-1 text-valhalla-100">
        {{ rating }}
      </BaseText>
      <StarRating :rating="rating" class="mr-2" />
      <BaseText size="xs" class="text-ashes-900">
        {{ reviewsCount }} reviews
      </BaseText>
    </div>
  </BaseCard>
</template>

<style scoped>
.product-card {
  max-width: 250px;
  transition: transform ease-in-out 150ms;
}

.product-card:hover {
  box-shadow: 0px 0px 14px 8px rgba(77, 90, 125, 0.1), 0px 4px 66px rgba(77, 90, 125, 0.04);
  transform: translateY(-5px);
}

.product-rating {
  display: flex;
  align-items: center;
}
</style>
