import { put } from '@vercel/blob';
import { createSupabaseClient } from '~/helpers/database';
import { processImageTask } from '~/trigger/process-image';
import { ImageProcessingStatus } from '~/types';

export default defineEventHandler(async (event) => {
  try {
    const formData = await readFormData(event);
    const file = formData.get('file') as File;
    if (!file) {
      throw createError({
        statusCode: 422,
        statusMessage: 'No file uploaded',
      });
    }

    console.log('Uploading file...')
    const blob = await put(file.name, file, { access: 'public' });
    console.log('Upload completed successfully', blob.url);

    const supabase = createSupabaseClient()
    const { data, error } = await supabase
      .from('images')
      .insert({
        image_url: blob.url,
        status: ImageProcessingStatus.PENDING,
      })
      .select()

    if (error) {
      throw createError({
        statusCode: 500,
        message: error.message,
      });
    }

    console.log('Launching background task...')
    const task = await processImageTask.trigger({
      imageUrl: blob.url,
      imageId: data[0].id,
    })
    console.log('Task launched', task.id)

    return {
      image: data[0],
      task: {
        id: task.id,
        publicAccessToken: task.publicAccessToken,
      }
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: error instanceof Error ? error.message : 'Upload failed',
    });
  }
});
