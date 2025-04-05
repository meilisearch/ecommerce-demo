import * as dotenv from 'dotenv'
import fs from 'fs'
import readline from 'readline'
import { MeiliSearch } from 'meilisearch'
import { loadCredentials, watchTasks } from '../utils.js'
import { processBatch } from './processBatch.js'

// Load environment
dotenv.config()

// Constants
const BATCH_SIZE = 2000
const MAX_BATCHES = 50
const INDEX_NAME = process.env.NUXT_PUBLIC_MEILISEARCH_INDEX_NAME
const DATASET_FILE = './database/dataset.jsonl'

// Initialize Meilisearch client
const credentials = loadCredentials()
const client = new MeiliSearch(credentials)

/**
 * Main function to process the dataset
 */
async function main() {
  console.log(`Starting to generate descriptions for products...`)
  console.log('------------------------------------------')

  // Create a readable stream for the dataset file
  const fileStream = fs.createReadStream(DATASET_FILE)
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })

  let batch = []
  let batchCount = 0
  let lineCount = 0

  // Process the file line by line
  for await (const line of rl) {
    if (line.trim() === '') continue

    try {
      const document = JSON.parse(line)

      batch.push(document)
      lineCount++

      // Process batch when it reaches the batch size
      if (batch.length >= BATCH_SIZE) {
        const processedBatch = await processBatch(batch)

        // Update documents in Meilisearch
        const task = await client.index(INDEX_NAME).updateDocuments(processedBatch)
        console.log(`Enqueued task ${task.taskUid} for batch ${batchCount + 1}`)
        await client.waitForTask(task.taskUid)
        console.log('------------------------------------------')

        batch = []
        batchCount++

        // Stop after processing MAX_BATCHES
        if (batchCount >= MAX_BATCHES) {
          console.log(`Reached maximum number of batches (${MAX_BATCHES}). Stopping.`)
          break
        }
      }
    } catch (error) {
      console.error(`Error parsing line ${lineCount + 1}: ${error.message}`)
    }
  }

  // Process any remaining documents in the last batch
  if (batch.length > 0 && batchCount < MAX_BATCHES) {
    const processedBatch = await processBatch(batch)
    const task = await client.index(INDEX_NAME).updateDocuments(processedBatch)
    console.log(`Enqueued task ${task.taskUid} for final batch`)
    // await client.waitForTask(task.taskUid)
  }

  console.log(`Processed ${lineCount} documents in ${batchCount + (batch.length > 0 ? 1 : 0)} batches.`)
  console.log('Description generation complete!')
}

// Run the main function
main().catch(error => {
  console.error('Error in main process:', error)
  process.exit(1)
})
