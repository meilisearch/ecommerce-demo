/* eslint-disable no-console */

export async function watchTasks(client, uid) {
  console.log('------------------------------------------')
  try {
    console.log(`${uid}: start watching tasks`)
    const tasks = await client.index(uid).getTasks()
    console.log(`${uid}: ${tasks.total} tasks found`)
    await client.index(uid).waitForTasks(tasks.results.map(task => task.uid))
    console.log(`${uid}: all tasks finished`)
  } catch (e) {
    console.log(`Error while updating ${uid} index`)
    console.error(e)
  } finally {
    console.log('------------------------------------------')
  }
}

export function loadCredentials() {
  const credentials = {
    host: process.env.NUXT_PUBLIC_MEILISEARCH_HOST,
    apiKey: process.env.MEILISEARCH_ADMIN_API_KEY
  }

  if (!credentials.host) {
    console.error('Missing `NUXT_PUBLIC_MEILISEARCH_HOST` environment variable')
    process.exit(1)
  }
  if (!credentials.apiKey) {
    console.error('Missing `MEILISEARCH_ADMIN_API_KEY` environment variable')
    process.exit(1)
  }

  return credentials
}
