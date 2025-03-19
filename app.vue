<script lang="ts" setup>
import { MeiliSearch } from "meilisearch"
import type { Product } from "~/types"
const db = useSupabase()
const config = useRuntimeConfig()

const meili = new MeiliSearch({
  host: config.public.meilisearch.host,
  apiKey: config.public.meilisearch.searchApiKey,
})

const { setResults } = useSearchStore()

const { data, error } = await db.from('images').select('embedding').eq('id', 4)
console.log('Retrieved image', data)

if (!error) {
  const result = await meili.index(config.public.meilisearch.indexName).search<Product>('', {
    vector: data[0].embedding as number[],
    hybrid: {
      embedder: 'image_desc_small',
      semanticRatio: 1
    },
    rankingScoreThreshold: 0.8,
    showRankingScore: true
  })

  console.log('Result', result.hits.map((hit) => hit._rankingScore))
  setResults(result.hits)
}
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
