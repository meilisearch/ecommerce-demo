<script lang="ts" setup>
const props = defineProps<{
  name: string
  brand: string
  price: number | null // some prices are null in our dataset
  rating: number | null
  reviewsCount?: number
  imageUrl?: string
}>()

const { name, brand, price, rating, reviewsCount } = toRefs(props)
const formattedPrice = computed(() => Number.isNaN(price) ? '-' : price)

const appConfig = useAppConfig()
const optimizedImageUrl = computed(() => {
  if (!props.imageUrl) {
    return null
  }

  return appConfig.images.twicpicsPaths.reduce((finalPath, { base, path }) => {
    return finalPath.replace(base, path)
  }, props.imageUrl)
})

const imageError = ref(false)
const onImageStateChange = ({ state }: { state: 'new' | 'loading' | 'error' | 'done'}) => {
  if (state === 'error') {
    imageError.value = true
  }
}
</script>

<template>
  <BaseCard class="product-card">
    <TwicImg
      :alt="name"
      :src="optimizedImageUrl"
      class="mb-5"
      @state-change="onImageStateChange"
    />
    <div class="px-5 pb-5">
      <BaseTitle size="xs" class="mb-1 text-hot-pink-500 -900">
        {{ brand }}
      </BaseTitle>
      <BaseText
        size="m"
        class="mb-2 text-valhalla-500 product-name"
        :title="name"
      >
        {{ name }}
      </BaseText>
      <BaseText size="l" class="mb-2">
        <span class="text-ashes-900">$</span> <span class="text-valhalla-100">{{ formattedPrice }}</span>
      </BaseText>
      <div class="product-rating">
        <template v-if="rating">
          <BaseText size="s" class="mr-1 text-valhalla-100">
            {{ rating }}
          </BaseText>

          <StarRating :rating="rating" class="my-auto mr-2 text-valhalla-100" />
          <BaseText v-if="reviewsCount" size="xs" class="text-ashes-900">
            <span>{{ reviewsCount }} reviews</span>
          </BaseText>
        </template>
        <BaseText v-else size="xs" class="text-ashes-900">
          No reviews yet
        </BaseText>
      </div>
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

.product-name {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.product-rating {
  display: flex;
  align-items: baseline;
}
</style>
