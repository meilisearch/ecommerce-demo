import { Meta, StoryObj } from '@storybook/vue3'
import GithubIcon from '~/components/atoms/GithubIcon.vue'

const meta: Meta<typeof GithubIcon> = {
  component: GithubIcon,
  render: args => ({
    components: { GithubIcon },
    setup: () => ({ args }),
    template: `
      <GithubIcon/>
    `
  })
}

export default meta

type Story = StoryObj<typeof GithubIcon>

export const Default: Story = {
}
