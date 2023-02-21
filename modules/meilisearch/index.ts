import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineNuxtModule, addPlugin, addServerHandler } from '@nuxt/kit'
import { defu } from 'defu'
import type { InstantMeiliSearchOptions } from '@meilisearch/instant-meilisearch'

interface ModuleOptions {
  enabled: boolean
  host: string
  searchApiKey: string
  options?: InstantMeiliSearchOptions
}

const parseBoolean = (str: string) => {
  if (str === 'true') {
    return true
  } else if (str === 'false') {
    return false
  }
  return undefined
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    configKey: 'meilisearch'
  },
  defaults: {
    enabled: parseBoolean(process.env.MEILISEARCH_ENABLED as string) || true,
    host: process.env.MEILISEARCH_HOST || '',
    searchApiKey: process.env.MEILISEARCH_SEARCH_API_KEY || ''
  },
  setup (resolvedOptions, nuxtApp) {
    if (!resolvedOptions.enabled || !parseBoolean(process.env.MEILISEARCH_ENABLED as string)) {
      console.log('`[Meilisearch]` Module is disabled')
      return
    }

    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))

    if (!resolvedOptions.host) {
      throw new Error('`[Meilisearch]` Missing `host`')
    }
    if (!resolvedOptions.searchApiKey) {
      throw new Error('`[Meilisearch]` Missing `searchApiKey`')
    }

    nuxtApp.options.runtimeConfig.public.meilisearch = defu(nuxtApp.options.runtimeConfig.meilisearch, {
      host: resolvedOptions.host,
      searchApiKey: resolvedOptions.searchApiKey,
      options: resolvedOptions.options
    })

    console.log('runtimeConfig', nuxtApp.options.runtimeConfig.public.meilisearch)

    addPlugin(resolve(runtimeDir, 'plugin'))

    nuxtApp.hook('imports:dirs', (dirs) => {
      dirs.push(resolve(runtimeDir, 'composables'))
    })

    addServerHandler({
      middleware: true,
      handler: resolve(runtimeDir, 'server/middleware/createInstantMeilisearch')
    })
  }
})
