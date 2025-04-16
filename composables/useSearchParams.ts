import type { Ref } from 'vue'

// TODO: use types from @meilisearch/instant-meilisearch
// Define the type for search parameters
export type SearchParams = {
  vector?: number[]
  hybrid?: {
    embedder: string
    semanticRatio: number
  }
  rankingScoreThreshold?: number
  showRankingScore?: boolean
  [key: string]: any
}

// Create a shared state composable
export const useSearchParams = () => {
  return useState<SearchParams>('searchParams', () => ({}))
}
