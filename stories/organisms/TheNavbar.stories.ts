import { Meta, StoryObj } from '@storybook/vue3'
import TheNavbar from '~/components/organisms/TheNavbar.vue'

const meta: Meta<typeof TheNavbar> = {
  component: TheNavbar,
  render: args => ({
    components: { TheNavbar },
    setup: () => ({ args }),
    template: `
      <TheNavbar/>
    `
  })
}

export default meta

type Story = StoryObj<typeof TheNavbar>

export const Default: Story = {
}
