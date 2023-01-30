
import BaseButton from '~/components/atoms/BaseButton.vue'

// 👇 This default export determines where your story goes in the story list
export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'BaseButton',
  component: BaseButton
}

// 👇 We create a “template” of how args map to rendering
const Template = (args, { argTypes }) => ({
  components: { BaseButton },
  props: Object.keys(argTypes),
  template: '<BaseButton v-bind="$props"/>'
})

export const FirstStory = Template.bind({})
FirstStory.args = {
  // 👇 The args you need here will depend on your component
}
