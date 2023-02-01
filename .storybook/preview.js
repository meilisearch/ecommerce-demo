// Import global CSS here
import '~/assets/css/typography.css'
import '~/assets/css/spacing.css'
import '~/assets/css/shadow.css'

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