import { Meta, StoryObj } from '@storybook/vue3'
import CheckboxList from '~/components/molecules/CheckboxList.vue'

const meta: Meta<typeof CheckboxList> = {
  component: CheckboxList,
  render: args => ({
    components: { CheckboxList },
    setup: () => ({ args }),
    template: `
      <CheckboxList/>
    `
  })
}

export default meta

type Story = StoryObj<typeof CheckboxList>

export const Default: Story = {
  args: {
    title: 'List title',
    items: [
      { name: 'item1', label: 'Item 1', modelValue: false },
      { name: 'item2', label: 'Item 2', modelValue: false },
      { name: 'item3', label: 'Item 3', modelValue: false }
    ]
  }
}
