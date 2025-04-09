import { MeiliSearch } from "meilisearch"
import type { Product } from "~/types"
import { useSearchParams } from "~/composables/useSearchParams"

export function useImageSearch() {
  const config = useRuntimeConfig()

  // We need the Meilisearch client for direct parameter setting
  const meili = new MeiliSearch({
    host: config.public.meilisearch.host,
    apiKey: config.public.meilisearch.searchApiKey,
  })

  const uploadFile = async (formData: FormData) => {
    const response = await $fetch(`/api/images/upload`, {
      method: 'POST',
      body: formData,
    });
    return response;
  }

  const generateDescription = async (imageUrl: string) => {
    const response = await $fetch(`/api/images/description`, {
      method: 'POST',
      body: { imageUrl },
    });
    return response;
  }

  const generateEmbedding = async (description: string) => {
    const response = await $fetch(`/api/images/embedding`, {
      method: 'POST',
      body: { description },
    });
    return response;
  }

  const meilisearch = useMeilisearch()

  // Use the shared search params state
  const searchParams = useSearchParams()

  // Get access to Nuxt app for the refresh function
  const nuxtApp = useNuxtApp()

  const vectorSearch = async (embedding: number[]) => {
    console.log('Updating meilisearch params...')

    // Update the search parameters in Meilisearch client - this is essential
    meilisearch.setMeiliSearchParams({
      vector: embedding,
      hybrid: {
        embedder: 'image_desc_small',
        semanticRatio: 1
      },
      rankingScoreThreshold: 0.8,
      showRankingScore: true
    })

    // Update the shared searchParams state for UI consistency
    searchParams.value = {
      vector: embedding,
      hybrid: {
        embedder: 'image_desc_small',
        semanticRatio: 1
      },
      rankingScoreThreshold: 0.8,
      showRankingScore: true
    }

    // Trigger a refresh of the search results
    setTimeout(() => {
      // Use type assertion to handle the refresh function
      const refreshFn = nuxtApp.$meiliSearchRefresh as Function | undefined
      if (refreshFn) {
        refreshFn()
      }
    }, 0)
  }

  return {
    uploadFile,
    generateDescription,
    generateEmbedding,
    vectorSearch
  }
}

