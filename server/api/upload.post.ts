// server/api/upload.ts
import { put } from '@vercel/blob';

export default defineEventHandler(async (event) => {
  try {
    console.log('Received upload request');

    // Get the form data
    const formData = await readFormData(event);
    console.log('Form data:', formData);

    const file = formData.get('file') as File;
    if (!file) {
      throw new Error('No file uploaded');
    }

    const blob = await put(file.name, file, { access: 'public' });

    console.log('Upload completed successfully');
    console.log('Blob URL:', blob.url);

    return blob;
  } catch (error) {
    console.error('Upload handler error:', error);
    throw createError({
      statusCode: 500,
      message: error instanceof Error ? error.message : 'Upload failed',
    });
  }
});
