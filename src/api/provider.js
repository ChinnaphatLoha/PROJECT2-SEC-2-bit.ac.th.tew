import app from '../backend/app.js'

class Provider {
  static async request(endpoint, data = null) {
    return await app.call(endpoint, data)
  }
}

// Example usage:
// Provider.request('/api/account/exists', {
//   username: 'ChinnaphatLoha',
//   password: 'bitadmin'
// })

export default Provider
