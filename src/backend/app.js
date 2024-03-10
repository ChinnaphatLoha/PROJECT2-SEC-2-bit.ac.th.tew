import Controller_Endpoints from './app/constants/controller-endpoints.js'
import AccountAccessEndpointsCaller from './app/controllers/AccountAccessController.js'

class App {
  static async call(endpoint, data = null) {
    if (endpoint.startsWith(Controller_Endpoints.ACCOUNT_ACCESS)) {
      return AccountAccessEndpointsCaller.call(endpoint, data)
    }
  }
}

export default App
