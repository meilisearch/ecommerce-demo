import type { SupabaseClient } from "@supabase/supabase-js";
import { configure, logger, schemaTask, } from "@trigger.dev/sdk/v3";
import { z } from "zod";
import { generateDescription, generateEmbedding } from '~/helpers/ai';
import { createSupabaseClient } from '~/helpers/database';
import { ImageProcessingStatus } from "~/types";

configure({
  secretKey: process.env["TRIGGER_SECRET_KEY"],
});

/**
 * Process an image and generate embeddings
 */
export const processImageTask = schemaTask({
  id: "generate-embeddings",
  schema: z.object({
    imageId: z.number(),
    imageUrl: z.string(),
  }),
  maxDuration: 60, // 1 minute
  run: async (payload: any, { ctx }) => {
    logger.log('Processing image...');
    const db = createSupabaseClient()

    const updateImageStatus = async (imageId: number, status: ImageProcessingStatus) => {
      const { data, error } = await db
        .from('images')
        .update({ status: status })
        .eq('id', imageId)
        .select()

      if (error) {
        throw new Error(error.message)
      }
      return data[0]
    }


    await updateImageStatus(payload.imageId, ImageProcessingStatus.STARTED)

    logger.log('Generating description...');
    await updateImageStatus(payload.imageId, ImageProcessingStatus.GENERATING_DESCRIPTION)
    const description = await generateDescription(payload.imageUrl)

    logger.log('Generating embeddings...');
    await updateImageStatus(payload.imageId, ImageProcessingStatus.GENERATING_EMBEDDINGS)
    const embedding = await generateEmbedding(description)

    logger.log('Storing embeddings...');
    const { data, error } = await db
      .from('images')
      .update({
        embedding: embedding,
        status: ImageProcessingStatus.COMPLETED,
      })
      .eq('id', payload.imageId)
      .select()

    if (error) {
      throw new Error(error.message)
    }


    return {
      message: `Successfully processed image ${payload.imageId}`,
      data: data[0],
    }
  },
});
