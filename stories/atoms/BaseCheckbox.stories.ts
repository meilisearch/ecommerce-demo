import { Meta, StoryObj } from '@storybook/vue3'
import BaseCheckbox from '~/components/atoms/BaseCheckbox.vue'

const meta: Meta<typeof BaseCheckbox> = {
  component: BaseCheckbox,
  render: args => ({
    components: { BaseCheckbox },
    setup: () => ({ args }),
    template: `
      <BaseCheckbox
        name="name"
        label="Label"
      />
    `
  })
}

export default meta

type Story = StoryObj<typeof BaseCheckbox>

export const Unchecked: Story = {
  args: {
    value: false
  }
}
export const Checked: Story = {
  args: {
    value: true
  }
}
