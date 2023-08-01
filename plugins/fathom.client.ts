import { defineNuxtPlugin } from '#app'
import VueFathomPlugin from '@ubclaunchpad/vue-fathom'

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log(`Fathom analytics disabled (env: ${process.env.NODE_ENV})`)
    return
  }

  if (runtimeConfig.public.fathomSiteID) {
    nuxtApp.vueApp.use(VueFathomPlugin, {
      siteID: runtimeConfig.public.fathomSiteID,
      settings: {
        spa: 'history'
      }
    })
  } else {
    // eslint-disable-next-line no-console
    console.log('Fathom analytics disabled: missing `FATHOM_SITE_ID`')
  }
})
