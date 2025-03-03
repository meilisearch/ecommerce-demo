import fs from 'fs'
import csv from 'csv-parser'
import { MeiliSearch } from 'meilisearch'
import dotenv from 'dotenv'
import { loadCredentials } from '../utils.js'

dotenv.config()

const credentials = loadCredentials()
const client = new MeiliSearch(credentials)
console.log(`Using Meilisearch host: ${credentials.host}\nSearch API key: ${credentials.apiKey}`)

async function processImagesCsv() {
  const results = []

  console.log('Reading CSV file...')

  // Read and process the CSV file
  await new Promise((resolve) => {
    fs.createReadStream('database/fashion-dataset/images.csv')
      .pipe(csv())
      .on('data', (data) => {
        results.push(data)
      })
      .on('end', resolve)
  })

  console.log(`Preparing ${results.length} documents for update...`)

  // Transform all rows into documents
  const documents = results.map(row => ({
    id: parseInt(row.filename.replace('.jpg', '')),
    imageUrl: row.link
  }))

  // Update all documents in one batch
  try {
    const index = client.index(process.env.NUXT_PUBLIC_MEILISEARCH_INDEX_NAME)
    await index.updateDocuments(documents)
    console.log('✨ Successfully updated all documents with images')
  } catch (error) {
    console.error('Error updating documents:', error)
  }
}

// Run the script
processImagesCsv()
  .catch(console.error)
