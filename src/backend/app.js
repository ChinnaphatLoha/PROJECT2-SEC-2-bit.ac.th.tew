import Controller_Endpoints from './app/constants/controller-endpoints.js'
import AccountAccessEndpointsCaller from './app/controllers/AccountAccessController.js'
import ProjectCompositionEndpointsCaller from './app/controllers/ProjectCompositionController.js'

class App {
  static async call(uri, init = null) {
    if (uri.startsWith(Controller_Endpoints.ACCOUNT_ACCESS)) {
      return AccountAccessEndpointsCaller.call(uri, init)
    } else if (uri.startsWith(Controller_Endpoints.PROJECT_COMPOSITION)) {
      return ProjectCompositionEndpointsCaller.call(uri, init)
    } else {
      return new Response(null, { status: 404, statusText: 'Endpoint not found' })
    }
  }
}

export default App
