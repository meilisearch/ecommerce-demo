import { Meta, StoryObj } from '@storybook/vue3'
import BaseTitle from '~/components/atoms/BaseTitle.vue'

const meta: Meta<typeof BaseTitle> = {
  component: BaseTitle,
  render: args => ({
    components: { BaseTitle },
    setup: () => ({ args }),
    template: `
      <BaseTitle>Category</BaseTitle>
    `
  })
}

export default meta

type Story = StoryObj<typeof BaseTitle>

export const Default: Story = {
}
