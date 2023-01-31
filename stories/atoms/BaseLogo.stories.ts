import { Meta, StoryObj } from '@storybook/vue3'
import BaseLogo from '~/components/atoms/BaseLogo.vue'

const meta: Meta<typeof BaseLogo> = {
  component: BaseLogo,
  render: args => ({
    components: { BaseLogo },
    setup: () => ({ args }),
    template: `
      <BaseLogo/>
    `
  })
}

export default meta

type Story = StoryObj<typeof BaseLogo>

export const Default: Story = {
}
