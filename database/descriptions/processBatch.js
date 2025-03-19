import path from 'path'
import {
  loadCache,
  saveCache,
  startPeriodicCacheSaving,
  stopPeriodicCacheSaving
} from './cache.js'
import { generateDescription } from '~/helpers/ai'

const CACHE_SAVE_INTERVAL_MS = 60000 // 1 minute
const CACHE_FILE_PATH = path.join(process.cwd(), '.cache/image-descriptions.json')

// Initialize cache from disk
let descriptionsCache = loadCache(CACHE_FILE_PATH)
startPeriodicCacheSaving(CACHE_FILE_PATH, descriptionsCache, CACHE_SAVE_INTERVAL_MS)

/**
 * Generate descriptions for a batch of documents
 * @param {Array} batch - Array of documents to process
 * @returns {Promise<Array>} - Processed documents with descriptions
 */
export async function processBatch(batch) {
  console.log(`Processing batch of ${batch.length} documents...`)

  // Create an array of promises for parallel processing
  const processingPromises = batch.map(async (document) => {
    try {
      // Get the image URL from the document
      const imageUrl = document.imageUrls.default || null

      if (!imageUrl) {
        console.warn(`No image URL found for document ID: ${document.id}`)
        return document
      }

      // console.debug(`Processing document ID: ${document.id}`)

      // Check if the description is already in the cache
      let description
      if (descriptionsCache[imageUrl]) {
        // console.debug(`Cache hit for image: ${imageUrl}`)
        description = descriptionsCache[imageUrl]
      } else {
        // console.debug(`Cache miss for image: ${imageUrl}, generating description...`)
        description = await generateDescription(imageUrl)
        // Store in cache as soon as we get the result
        descriptionsCache[imageUrl] = description
      }

      // console.debug(`Document ID ${document.id} description: ${description}`)

      // Add description to document
      document.imageDescription = description
      return document
    } catch (error) {
      console.error(`Error processing document: ${error.message}`)
      // Return the document without a description
      return document
    }
  })

  // Wait for all promises to resolve
  const processedBatch = await Promise.all(processingPromises)

  // Stop the interval timer first to prevent potential double saves
  stopPeriodicCacheSaving()

  // Save cache after processing the batch
  saveCache(CACHE_FILE_PATH, descriptionsCache)

  return processedBatch
}


