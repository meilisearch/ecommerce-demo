
export async function watchTasks (client, uid) {
  console.log(`Start update watch for ${uid}`)
  console.log('-------------')
  try {
    const tasks = await client.index(uid).getTasks()
    console.log(`${uid} index: adding documents`)
    console.log('-------------')
    await client.index(uid).waitForTasks(tasks)
    console.log(`All documents added to "${uid}"`)
  } catch (e) {
    console.error(e)
  }
}
