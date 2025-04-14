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

    // console.log('Generating description...');
    // const description = await generateDescription(blob.url)
    // console.log('Description generated', description);

    // console.log('Generating embeddings...');
    // const embedding = await generateEmbedding(description)
    // console.log('Embeddings generated', embedding);

    // console.log('Returning response ✅');
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
