import { generateDescription } from "~/helpers/ai";

export default defineEventHandler(async (event) => {
  const { imageUrl } = await readBody(event);
  console.log('Generating description...');
  const description = await generateDescription(imageUrl);
  console.log('Description generated');
  return { description };
});
