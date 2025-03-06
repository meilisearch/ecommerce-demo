import * as dotenv from 'dotenv'
import { MeiliSearch } from 'meilisearch'
import { watchTasks, loadCredentials } from './utils.js'
import data from './data.json' assert { type: 'json' }

// Load environment
dotenv.config()

const credentials = loadCredentials()

const INDEX_NAME = 'products'

/* eslint-disable no-console */

const setup = async () => {
  console.log('🚀 Seeding your Meilisearch instance')

  const client = new MeiliSearch(credentials)
  console.log(`Using Meilisearch host: ${credentials.host}\nSearch API key: ${credentials.apiKey}`)

  console.log(`Adding filterable attributes to \`${INDEX_NAME}\``)
  await client.index(INDEX_NAME).updateFilterableAttributes([
    'brand',
    'category',
    'tag',
    'rating_rounded',
    'reviews_count',
    'price'
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
    'rating',
    'price'
  ])

  // console.log(`Adding documents to \`${INDEX_NAME}\``)
  // await client.index(INDEX_NAME).addDocuments(data)

  await watchTasks(client, INDEX_NAME)
}

setup()
