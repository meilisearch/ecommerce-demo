import { put } from '@vercel/blob';

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
    console.log('Upload completed');

    return {
      blob
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: error instanceof Error ? error.message : 'Upload failed',
    });
  }
});
