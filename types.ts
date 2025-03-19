export interface Product {
  id: string
  productDisplayName: string
  brandName: string
  price: number | null
  imageUrls: {
    search?: string
    default: string
  }
  masterCategory: string
  subCategory: string
  gender: string
  baseColour: string
  usage: string
}

export const ImageProcessingStatus = {
  PENDING: 'pending',
  STARTED: 'started',
  GENERATING_DESCRIPTION: 'generating_description',
  GENERATING_EMBEDDINGS: 'generating_embeddings',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const

export type ImageProcessingStatus = (typeof ImageProcessingStatus)[keyof typeof ImageProcessingStatus]
