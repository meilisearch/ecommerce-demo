import { Meta, StoryObj } from '@storybook/vue3'
import BaseButton from '~/components/atoms/BaseButton.vue'

const meta = {
  component: BaseButton,
  render: args => ({
    components: { BaseButton },
    setup: () => ({ args }),
    template: `
      <BaseButton>Button</BaseButton>
    `
  }),
  argTypes: {
    secondary: { type: 'boolean' },
    color: { options: ['dodger-blue', 'hot-pink'] },
    size: { options: ['default', 'large', 'small'] }
  },
  args: {
    secondary: false
  }
} satisfies Meta<typeof BaseButton>

export default meta

type Story = StoryObj<typeof meta>

export const PrimaryDodgerBlue: Story = {
  args: {
    color: 'dodger-blue',
    size: 'default'
  }
} satisfies Story

export const SecondaryDodgerBlue: Story = {
  args: {
    color: 'dodger-blue',
    secondary: true,
    size: 'default'
  }
} satisfies Story

export const PrimaryHotPink: Story = {
  args: {
    color: 'hot-pink',
    size: 'default'
  }
} satisfies Story

export const SecondaryHotPink: Story = {
  args: {
    color: 'hot-pink',
    secondary: true,
    size: 'default'
  }
} satisfies Story

export const Small: Story = {
  args: {
    ...PrimaryDodgerBlue.args,
    size: 'small'
  }
} satisfies Story

export const Large: Story = {
  args: {
    ...PrimaryDodgerBlue.args,
    size: 'large'
  }
} satisfies Story
