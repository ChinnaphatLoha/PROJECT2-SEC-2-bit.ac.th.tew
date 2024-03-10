import app from '../backend/app.js'

class Provider {
  static async request(endpoint, data = null) {
    return await app.call(endpoint, data)
  }
}

// Example usage:
const isUserExist = await Provider.request('/api/account/exists', 'ChinnaphatLoha')

console.log(isUserExist)

export default Provider
