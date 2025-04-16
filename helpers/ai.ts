import { openai } from '@ai-sdk/openai'
import { generateText, embed } from 'ai'

/**
 * Generate image description using GPT-4o-mini
 * @param imageUrl - The URL of the image to describe
 * @returns The description of the product
 */
export async function generateDescription(imageUrl: string) {
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

  return description
}

/**
 * Generate embeddings using text-embedding-3-small
 * @param imageDescription - The description of the product
 * @returns The embeddings of the product
 */
export async function generateEmbedding(imageDescription: string) {
  const { embedding } = await embed({
    model: openai.embedding('text-embedding-3-small'),
    value: imageDescription,
  })

  return embedding
}
