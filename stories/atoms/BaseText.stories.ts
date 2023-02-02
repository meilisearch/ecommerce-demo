import { Meta, StoryObj } from '@storybook/vue3'
import BaseText from '~/components/atoms/BaseText.vue'

const meta: Meta<typeof BaseText> = {
  component: BaseText,
  render: args => ({
    components: { BaseText },
    setup: () => ({ args }),
    template: `
      <BaseText>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis rem perspiciatis reprehenderit. Id non natus nemo illum sequi deserunt molestias eum, illo sed vero suscipit, commodi necessitatibus magni, distinctio quae!
      </BaseText>
    `
  }),
  argTypes: {
    size: {
      options: ['l', 'm', 's', 'xs']
    }
  }
}

export default meta

type Story = StoryObj<typeof BaseText>

export const Large: Story = {
  args: {
    size: 'l'
  }
}

export const Medium: Story = {
  args: {
    size: 'm'
  }
}

export const Small: Story = {
  args: {
    size: 's'
  }
}

export const ExtraSmall: Story = {
  args: {
    size: 'xs'
  }
}
