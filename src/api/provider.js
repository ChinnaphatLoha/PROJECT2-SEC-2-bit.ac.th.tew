import app from '../backend/app.js'

class Provider {
  static async request(uri, init = null) {
    return await app.call(uri, init)
  }
}

export default Provider
