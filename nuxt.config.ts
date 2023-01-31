// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  components: {
    dirs: [
      '~/components/atoms',
      '~/components/molecules',
      '~/components/organisms'
    ]
  },
  css: [
    '~/assets/css/typography.css',
    '~/assets/css/spacing.css'
  ]
})
