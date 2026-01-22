/**
 * Set of helpers related to Browser Database
 * @class CSS
 * @namespace Util/BrowserDatabase
 */
export class BrowserDatabase {
  /**
   * Loads data from browser storage
   * @param {String} location Name of the local storage
   * @return {Object} Object stored in a specified path
   * @memberof BrowserDatabase
   */
  getItem(location: string) {
    if (typeof window === 'undefined') return null // Prevent access on the server

    try {
      const entryObject = JSON.parse(localStorage.getItem(location) as any)
      if (!entryObject) return null

      const { data, expiration, createdAt } = entryObject
      const MILLISECONDS_TO_SECONDS = 1000

      if (expiration && Date.now() - createdAt > expiration * MILLISECONDS_TO_SECONDS) {
        localStorage.removeItem(location)
        return null
      }

      return data
    } catch {
      return null
    }
  }

  /**
   * Save data to local storage
   * @param {Any} data The value to save to local storage
   * @param {String} location Name of the local storage
   * @param {Number} expiration Time to store entry (in seconds)
   * @return {Void}
   * @memberof BrowserDatabase
   */
  setItem(data: any, location: string, expiration?: number): void {
    if (typeof window === 'undefined') return // Prevent access on the server

    localStorage.setItem(
      location,
      JSON.stringify({
        data,
        expiration,
        createdAt: Date.now(),
      })
    )
  }

  /**
   * Delete item from local storage
   * @param {String} location
   * @memberof BrowserDatabase
   */
  deleteItem(location: string): void {
    if (typeof window === 'undefined') return // Prevent access on the server

    localStorage.removeItem(location)
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new BrowserDatabase()
