import { Meta, StoryObj } from '@storybook/vue3'
import StarRating from '~/components/molecules/StarRating.vue'

export const ratingArgType = {
  control: { type: 'number', min: 0, max: 5, step: 0.1 }
}

const meta: Meta<typeof StarRating> = {
  component: StarRating,
  render: args => ({
    components: { StarRating },
    setup: () => ({ args }),
    template: `
      <StarRating v-bind="args" />
    `
  }),
  argTypes: {
    rating: ratingArgType
  },
  args: {
    rating: 3.5
  }
}

export default meta

type Story = StoryObj<typeof StarRating>

export const Full: Story = {
  args: {
    rating: 5
  }
}

export const Empty: Story = {
  args: {
    rating: 0
  }
}

export const BelowHalfStar: Story = {
  args: {
    rating: 1.1
  }
}

export const AboveHalfStar: Story = {
  args: {
    rating: 1.3
  }
}
