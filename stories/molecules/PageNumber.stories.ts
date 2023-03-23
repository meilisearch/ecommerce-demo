import { Meta, StoryObj } from '@storybook/vue3'
import PageNumber from '~/components/molecules/PageNumber.vue'

const meta = {
  component: PageNumber,
  render: args => ({
    components: { PageNumber },
    setup: () => ({ args }),
    template: `
      <PageNumber>Page X</PageNumber>
    `
  }),
  argTypes: {
    showSeparator: { type: 'boolean' },
    separator: { options: ['before', 'after'] },
    hasGapSeparator: { type: 'boolean' }
  },
  args: {
    isCurrent: false,
    showSeparator: true,
    separator: 'after',
    hasGapSeparator: false
  }
} satisfies Meta<typeof PageNumber>

export default meta

type Story = StoryObj<typeof meta>

export const Default = {} satisfies Story

export const CurrentPage = {
  args: {
    isCurrent: true
  }
} satisfies Story

export const WithoutSeparator = {
  args: {
    showSeparator: false
  }
} satisfies Story

export const SeparatorBefore = {
  args: {
    separator: 'before',
    hasGapSeparator: false
  }
} satisfies Story

export const WithGapSeparatorAfter = {
  args: {
    separator: 'after',
    hasGapSeparator: true
  }
} satisfies Story

export const WithGapSeparatorBefore = {
  args: {
    separator: 'before',
    hasGapSeparator: true
  }
} satisfies Story
