import fs from 'fs'
import path from 'path'

// Timer reference for cleanup
let cacheIntervalTimer = null

/**
 * Loads cache data from the specified file path
 * @param {string} cachePath - Path to the cache file
 * @returns {Object} The loaded cache object or an empty object if file doesn't exist or has errors
 */
export function loadCache(cachePath) {
  const cacheObject = {}

  try {
    if (fs.existsSync(cachePath)) {
      const cacheData = fs.readFileSync(cachePath, 'utf8')
      const loadedCache = JSON.parse(cacheData)

      // Return the loaded cache directly
      console.log(`Loaded ${Object.keys(loadedCache).length} cached descriptions from disk`)
      return loadedCache
    }
  } catch (error) {
    console.error(`Error loading cache from disk: ${error.message}`)
    // Continue with empty cache
  }

  return cacheObject
}

/**
 * Saves the cache object to disk at the specified path
 * @param {string} cachePath - Path where the cache file should be saved
 * @param {Object} cacheObject - The cache data to be saved
 * @returns {void}
 */
export function saveCache(cachePath, cacheObject) {
  try {
    // Ensure directory exists
    const cacheDir = path.dirname(cachePath)
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true })
    }

    fs.writeFileSync(cachePath, JSON.stringify(cacheObject, null, 2))
    console.log(`Saved ${Object.keys(cacheObject).length} descriptions to cache file`)
  } catch (error) {
    console.error(`Error saving cache to disk: ${error.message}`)
  }
}

/**
 * Starts a timer to periodically save the cache to disk
 * @param {string} cachePath - Path where the cache file should be saved
 * @param {Object} cacheObject - The cache data to be saved
 * @param {number} intervalMs - Interval in milliseconds between cache saves
 * @returns {NodeJS.Timeout} The timer reference
 */
export function startPeriodicCacheSaving(cachePath, cacheObject, intervalMs) {
  // Clear any existing timer first
  if (cacheIntervalTimer) {
    clearInterval(cacheIntervalTimer)
  }

  // Setup new timer
  cacheIntervalTimer = setInterval(() => {
    saveCache(cachePath, cacheObject)
  }, intervalMs)

  return cacheIntervalTimer
}

/**
 * Stops the periodic cache saving timer if it exists
 * @returns {void}
 */
export function stopPeriodicCacheSaving() {
  if (cacheIntervalTimer) {
    clearInterval(cacheIntervalTimer)
    cacheIntervalTimer = null
  }
}
