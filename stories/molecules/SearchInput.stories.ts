import { Meta, StoryObj } from '@storybook/vue3'
import SearchInput from '~/components/molecules/SearchInput.vue'

const meta: Meta<typeof SearchInput> = {
  component: SearchInput,
  render: args => ({
    components: { SearchInput },
    setup: () => ({ args }),
    template: `
      <SearchInput v-bind="args" />
    `
  }),
  args: {
    value: ''
  }
}

export default meta

type Story = StoryObj<typeof SearchInput>

export const Default: Story = {
}
