import type { Product } from "~/types"

export const useSearchStore = defineStore('search', () => {
  const results = ref<Product[]>([])

  const setResults = (data: Product[]) => {
    results.value = data
  }

  return {
    results,
    setResults
  }
})
