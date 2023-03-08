import { Meta, StoryObj } from '@storybook/vue3'
import TwitterIcon from '~/components/atoms/TwitterIcon.vue'

const meta: Meta<typeof TwitterIcon> = {
  component: TwitterIcon,
  render: args => ({
    components: { TwitterIcon },
    setup: () => ({ args }),
    template: `
      <TwitterIcon/>
    `
  })
}

export default meta

type Story = StoryObj<typeof TwitterIcon>

export const Default: Story = {
}
