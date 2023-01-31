import { Meta, StoryObj } from '@storybook/vue3'
import BaseButton from '~/components/atoms/BaseButton.vue'

const meta: Meta<typeof BaseButton> = {
  component: BaseButton,
  render: args => ({
    components: { BaseButton },
    setup: () => ({ args }),
    template: `
      <BaseButton>Button</BaseButton>
    `
  }),
  argTypes: {
    color: { options: ['dodger-blue', 'hot-pink'] },
    size: { options: ['default', 'large', 'small'] }
  }
}

export default meta

type Story = StoryObj<typeof BaseButton>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/7.0/vue/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  args: {
    color: 'dodger-blue',
    primary: true,
    size: 'default'
  }
}

export const Secondary: Story = {
  args: {
    color: 'dodger-blue',
    primary: false,
    size: 'default'
  }
}

export const Small: Story = {
  args: {
    ...Primary.args,
    size: 'small'
  }
}

export const Large: Story = {
  args: {
    ...Primary.args,
    size: 'large'
  }
}
