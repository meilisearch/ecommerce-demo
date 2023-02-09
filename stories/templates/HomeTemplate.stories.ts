import { Meta, StoryObj } from '@storybook/vue3'
import HomeTemplate from '~/components/templates/HomeTemplate.vue'

const meta: Meta<typeof HomeTemplate> = {
  component: HomeTemplate,
  render: args => ({
    components: { HomeTemplate },
    setup: () => ({ args }),
    template: `
      <HomeTemplate/>
    `
  }),
  parameters: {
    layout: 'fullscreen'
  }
}

export default meta

type Story = StoryObj<typeof HomeTemplate>

export const Default: Story = {
}
