import { MeiliSearch } from "meilisearch"
import type { Product } from "~/types"

export function useImageSearch() {
  const config = useRuntimeConfig()

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

  const vectorSearch = async (embedding: number[]) => {
    const result = await meili.index(config.public.meilisearch.indexName).search<Product>('', {
      vector: embedding,
      hybrid: {
        embedder: 'image_desc_small',
        semanticRatio: 1
      },
      rankingScoreThreshold: 0.8,
      showRankingScore: true
    })
    return result
  }

  return {
    uploadFile,
    generateDescription,
    generateEmbedding,
    vectorSearch
  }
}

