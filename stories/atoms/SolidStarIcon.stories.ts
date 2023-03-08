import { Meta, StoryObj } from '@storybook/vue3'
import SolidStarIcon from '~/components/atoms/SolidStarIcon.vue'

const meta: Meta<typeof SolidStarIcon> = {
  component: SolidStarIcon,
  render: args => ({
    components: { SolidStarIcon },
    setup: () => ({ args }),
    template: `
      <SolidStarIcon/>
    `
  })
}

export default meta

type Story = StoryObj<typeof SolidStarIcon>

export const Default: Story = {
}
