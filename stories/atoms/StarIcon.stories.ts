import { Meta, StoryObj } from '@storybook/vue3'
import StarIcon from '~/components/atoms/StarIcon.vue'

const meta: Meta<typeof StarIcon> = {
  component: StarIcon,
  render: args => ({
    components: { StarIcon },
    setup: () => ({ args }),
    template: `
      <StarIcon/>
    `
  })
}

export default meta

type Story = StoryObj<typeof StarIcon>

export const Default: Story = {
}
