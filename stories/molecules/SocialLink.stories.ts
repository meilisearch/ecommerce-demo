import { Meta, StoryObj } from '@storybook/vue3'
import SocialLink from '~/components/molecules/SocialLink.vue'

const meta = {
  component: SocialLink,
  render: args => ({
    components: { SocialLink },
    setup: () => ({ args }),
    template: `
      <SocialLink/>
    `
  }),
  args: {
    url: 'https://example.com'
  }
} satisfies Meta<typeof SocialLink>

export default meta

type Story = StoryObj<typeof meta>

export const Github = {
  args: {
    icon: 'github'
  }
} satisfies Story

export const Twitter = {
  args: {
    icon: 'twitter'
  }
} satisfies Story
