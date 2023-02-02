import { Meta, StoryObj } from '@storybook/vue3'
import HalfSolidStarIcon from '~/components/atoms/HalfSolidStarIcon.vue'

const meta: Meta<typeof HalfSolidStarIcon> = {
  component: HalfSolidStarIcon,
  render: args => ({
    components: { HalfSolidStarIcon },
    setup: () => ({ args }),
    template: `
      <HalfSolidStarIcon/>
    `
  })
}

export default meta

type Story = StoryObj<typeof HalfSolidStarIcon>

export const Default: Story = {
}
