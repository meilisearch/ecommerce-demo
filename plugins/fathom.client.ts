import { defineNuxtPlugin } from '#app'
import VueFathomPlugin from '@ubclaunchpad/vue-fathom'

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()

  if (runtimeConfig.public.fathomSiteID) {
    nuxtApp.vueApp.use(VueFathomPlugin, {
      siteID: runtimeConfig.public.fathomSiteID,
      settings: {
        spa: 'history'
      }
    })
  } else {
    console.log('Fathom analytics disabled: missing `FATHOM_SITE_ID`')
  }
})
