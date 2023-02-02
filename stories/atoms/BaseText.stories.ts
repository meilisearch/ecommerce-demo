import { Meta, StoryObj } from '@storybook/vue3'
import BaseText from '~/components/atoms/BaseText.vue'

const meta: Meta<typeof BaseText> = {
  component: BaseText,
  render: args => ({
    components: { BaseText },
    setup: () => ({ args }),
    template: `
      <BaseText>This is some text.</BaseText>
    `
  })
}

export default meta

type Story = StoryObj<typeof BaseText>

export const Default: Story = {
}
