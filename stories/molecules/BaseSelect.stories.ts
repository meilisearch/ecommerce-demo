import { Meta, StoryObj } from '@storybook/vue3'
import BaseSelect from '~/components/molecules/BaseSelect.vue'

const meta: Meta<typeof BaseSelect> = {
  component: BaseSelect,
  render: args => ({
    components: { BaseSelect },
    setup: () => ({ args }),
    template: `
      <BaseSelect></BaseSelect>
    `
  }),
  argTypes: {
    options: {
      control: { type: 'object' }
    }
  }
}

export default meta

type Story = StoryObj<typeof BaseSelect>

export const WithShortOptions: Story = {
  args: {
    options: [
      { value: '1', label: 'A' },
      { value: '2', label: 'B' },
      { value: '3', label: 'C' },
      { value: '4', label: 'D' }
    ]
  }
}

export const WithVariableOptionsSize: Story = {
  args: {
    options: [
      { value: '1', label: 'A very long option label that seems to never end' },
      { value: '2', label: 'Shorter option' }
    ]
  }
}

export const WithDefaultValue: Story = {
  args: {
    options: WithShortOptions.args?.options,
    value: '2'
  }
}
