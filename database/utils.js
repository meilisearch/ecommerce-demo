/* eslint-disable no-console */

export async function watchTasks (client, uid) {
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
