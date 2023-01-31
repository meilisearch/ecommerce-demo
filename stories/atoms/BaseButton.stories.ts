// BaseButton.stories.ts

import type { Meta, StoryObj } from '@storybook/vue3'
import BaseButton from '~/components/atoms/BaseButton.vue'

const meta: Meta<typeof BaseButton> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/7.0/vue/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'BaseButton',
  component: BaseButton
}

export default meta
type Story = StoryObj<typeof BaseButton>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/7.0/vue/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => ({
    components: { BaseButton },
    template: `
      <BaseButton>Button</BaseButton>
    `
  })
}
