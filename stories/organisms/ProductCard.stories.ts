import { Meta, StoryObj } from '@storybook/vue3'
import { ratingArgType } from '../molecules/StarRating.stories'
import ProductCard from '~/components/organisms/ProductCard.vue'
import products from '~/database/data.json'

const sample = products[1]

const meta: Meta<typeof ProductCard> = {
  component: ProductCard,
  render: args => ({
    components: { ProductCard },
    setup: () => ({ args }),
    template: `
      <ProductCard v-bind="args" />
    `
  }),
  argTypes: {
    rating: ratingArgType
  },
  args: {
    name: sample.title,
    brand: sample.brand,
    price: sample.price,
    rating: sample.rating,
    reviewsCount: sample.reviews_count,
    imageUrl: sample.images[0]
  }
}

export default meta

type Story = StoryObj<typeof ProductCard>

export const Default: Story = {
}
