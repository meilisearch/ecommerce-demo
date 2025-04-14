import { generateEmbedding } from "~/helpers/ai";

export default defineEventHandler(async (event) => {
  const { description } = await readBody(event);
  console.log('Generating embeddings...');
  const embedding = await generateEmbedding(description);
  console.log('Embeddings generated');
  return { embedding };
});
