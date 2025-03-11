import * as dotenv from 'dotenv'
import { MeiliSearch } from 'meilisearch'
import { watchTasks, loadCredentials } from './utils.js'

// Load environment
dotenv.config()

const credentials = loadCredentials()

const INDEX_NAME = process.env.NUXT_PUBLIC_MEILISEARCH_INDEX_NAME

/* eslint-disable no-console */

const setup = async () => {
  console.log('🛠️ Updating your Meilisearch settings')

  const client = new MeiliSearch(credentials)
  console.log(`Using Meilisearch host: ${credentials.host}\nSearch API key: ${credentials.apiKey}`)

  console.log(`Adding filterable attributes to \`${INDEX_NAME}\``)
  await client.index(INDEX_NAME).updateFilterableAttributes([
    'baseColour',
    'gender',
    'imageUrls',
    'masterCategory',
    'price',
    'season',
    'subCategory',
    'usage'
  ])

  console.log(`Adding ranking rules to \`${INDEX_NAME}\``)
  await client.index(INDEX_NAME).updateRankingRules([
    'sort',
    'words',
    'typo',
    'proximity',
    'attribute',
    'exactness'
  ])

  console.log(`Adding sortable attributes to \`${INDEX_NAME}\``)
  await client.index(INDEX_NAME).updateSortableAttributes([
    'price'
  ])

  await watchTasks(client, INDEX_NAME)
}

setup()
