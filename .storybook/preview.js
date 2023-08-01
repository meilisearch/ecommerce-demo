// Import vue app to configure it
import { setup } from '@storybook/vue3'
import TwicPics from '@twicpics/components/vue3'

// Import global CSS here
import '@twicpics/components/style.css'
import '~/assets/css/typography.css'
import '~/assets/css/spacing.css'
import '~/assets/css/shadow.css'

// Vue instance configuration
setup(app => {
  app.use(TwicPics, {
    domain: import.meta.env.STORYBOOK_TWICPICS_DOMAIN
  })
})

// Preview settings
export const parameters = {
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: '#f1f1f9',
      },
    ],
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
