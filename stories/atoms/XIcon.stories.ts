import { Meta, StoryObj } from '@storybook/vue3'
import XIcon from '~/components/atoms/XIcon.vue'

const meta: Meta<typeof XIcon> = {
  component: XIcon,
  render: args => ({
    components: { XIcon },
    setup: () => ({ args }),
    template: `
      <XIcon/>
    `
  })
}

export default meta

type Story = StoryObj<typeof XIcon>

export const Default: Story = {
}
