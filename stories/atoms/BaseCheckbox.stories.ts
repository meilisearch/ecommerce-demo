import { Meta, StoryObj } from '@storybook/vue3'
import BaseCheckbox from '~/components/atoms/BaseCheckbox.vue'

const meta = {
  component: BaseCheckbox,
  render: args => ({
    components: { BaseCheckbox },
    setup: () => ({ args }),
    template: `
      <BaseCheckbox />
    `
  })
} satisfies Meta<typeof BaseCheckbox>

export default meta

type Story = StoryObj<typeof BaseCheckbox>

export const Unchecked = {
  args: {
    name: 'checkbox-1',
    label: 'Label',
    value: false
  }
} satisfies Story

export const Checked = {
  args: {
    name: 'checkbox-2',
    label: 'Label',
    value: true
  }
} satisfies Story

export const Disabled = {
  args: {
    name: 'checkbox-3',
    label: 'Label',
    value: false,
    disabled: true
  }
} satisfies Story
