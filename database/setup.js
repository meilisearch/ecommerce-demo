import * as dotenv from 'dotenv'
import { MeiliSearch } from 'meilisearch'
import { watchTasks } from './utils.js'
import data from './data.json' assert { type: 'json' }

// Load environment
dotenv.config()

const credentials = {
  host: process.env.MEILISEARCH_HOST,
  apiKey: process.env.MEILISEARCH_ADMIN_API_KEY
}

const INDEX_NAME = 'products'

const setup = async () => {
  console.log('🚀 Seeding your Meilisearch instance')

  if (!credentials.host) {
    console.error('Missing `MEILISEARCH_HOST` environment variable')
    process.exit(1)
  }
  if (!credentials.apiKey) {
    console.error('Missing `MEILISEARCH_ADMIN_API_KEY` environment variable')
    process.exit(1)
  }

  // Setup code will go here
}

setup()
