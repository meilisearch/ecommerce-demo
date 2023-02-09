import * as dotenv from 'dotenv'
import { MeiliSearch } from 'meilisearch'
import { watchTasks } from './utils.js'
import data from './data.json' assert { type: 'json' }

// Load environment
dotenv.config()

const credentials = {
  host: process.env.MEILI_HOST,
  apiKey: process.env.MEILI_ADMIN_API_KEY
}

const INDEX_NAME = 'products'

const setup = async () => {
  if (!credentials.host || !credentials.apiKey) {
    console.error('Missing MEILI_HOST or MEILI_ADMIN_API_KEY environment variable.')
    process.exit(1)
  }

  const client = new MeiliSearch(credentials)

  await client.index(INDEX_NAME).addDocuments(data)

  await watchTasks(client, INDEX_NAME)
}

setup()
