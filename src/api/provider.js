import app from '../backend/app.js'

class Provider {
  static async request(uri, init = null) {
    try {
      const response = await app.call(uri, init)
      return response
    } catch (error) {
      console.error('Request failed:', error)
      return new Response(null, { status: 500, statusText: 'Internal Server Error' })
    }
  }
}

export default Provider
