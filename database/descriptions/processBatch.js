import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'

/**
 * Generate descriptions for a batch of documents
 * @param {Array} batch - Array of documents to process
 * @returns {Promise<Array>} - Processed documents with descriptions
 */
export async function processBatch(batch) {
  console.log(`Processing batch of ${batch.length} documents...`)

  const processedBatch = []

  for (const document of batch) {
    try {
      // Get the image URL from the document
      const imageUrl = document.imageUrls.default || null

      if (!imageUrl) {
        console.warn(`No image URL found for document ID: ${document.id}`)
        processedBatch.push(document)
        continue
      }

      // Generate description using GPT-4o
      const { text: description } = await generateText({
        model: openai('gpt-4o-mini'),
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: 'Describe the product in this image. Only output the description.' },
              { type: 'image', image: imageUrl }
            ],
          },
        ],
      })

      // Add description to document
      document.imageDescription = description
      processedBatch.push(document)
    } catch (error) {
      console.error(`Error processing document: ${error.message}`)
      // Add the document without a description
      processedBatch.push(document)
    }
  }

  return processedBatch
}
