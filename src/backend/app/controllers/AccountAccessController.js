import RegistrationService from '../services/RegistrationService.js'
import LoginService from '../services/LoginService.js'
import SchemaValidator from '../middlewares/persistence_layer/validator/SchemaValidator.js'
import { User } from '../schema.js'
import Controller_Endpoints from '../constants/controller-endpoints.js'
import { extractEndpointToObject, extractQueryParams } from '../../utils/api-utils.js'

class AccountAccessController {
  constructor() {
    this._registrationService = new RegistrationService()
    this._loginService = new LoginService()
    this._userValidator = new SchemaValidator(User)
  }

  async isAvailable(queryString) {
    const queryParams = extractQueryParams(queryString)
    const data = await this._registrationService.isAvailable(queryParams)
    return new Response(JSON.stringify(data), { status: 200 })
  }

  async registerUser(data) {
    try {
      const validatedUser = this._userValidator.validate(data)
      const resData = await this._registrationService.registerUser(validatedUser)
      return new Response(JSON.stringify(resData), { status: 201 })
    } catch (error) {
      return new Response(null, { status: 400, statusText: error.message })
    }
  }

  async authenticateUser(data) {
    const { username, password } = data
    if (!username)
      return new Response(null, { status: 400, statusText: 'field "username" is required' })
    if (!password)
      return new Response(null, { status: 400, statusText: 'field "password" is required' })
    const dataOrResponse = await this._loginService.authenticateUser(username, password)
    if (dataOrResponse instanceof Response) return dataOrResponse
    return new Response(JSON.stringify(dataOrResponse), { status: 200 })
  }

  async getUserFromSessionId(data) {
    const { sessionId } = data
    if (!sessionId)
      return new Response(null, { status: 400, statusText: 'field "sessionId" is required' })
    const dataOrResponse = await this._loginService.getUserFromSessionId(sessionId)
    if (dataOrResponse instanceof Response) return dataOrResponse
    return new Response(JSON.stringify(dataOrResponse), { status: 200 })
  }
}

class AccountAccessEndpointsCaller {
  static endpoint = Controller_Endpoints.ACCOUNT_ACCESS
  static call(uri, init = null) {
    const controller = new AccountAccessController()
    const { endpoint, query } = extractEndpointToObject(uri)
    const data = init?.body ? JSON.parse(init.body) : null
    switch (endpoint) {
      case `${this.endpoint}/availability`:
        return controller.isAvailable(query)
      case `${this.endpoint}/register`:
        return controller.registerUser(data)
      case `${this.endpoint}/login`:
        return controller.authenticateUser(data)
      case `${this.endpoint}/session`:
        return controller.getUserFromSessionId(data)
      default:
        return new Response(null, { status: 404, statusText: 'Endpoint not found' })
    }
  }
}

export default AccountAccessEndpointsCaller
