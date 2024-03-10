import app from '../backend/app.js'

class Provider {
  static async request(endpoint, data = null) {
    return await app.call(endpoint, data)
  }
}

// Example usage:
const isUserAvailable = await Provider.request('/api/account/exists', 'ChinnaphatLoha')

console.log(isUserAvailable)

export default Provider
