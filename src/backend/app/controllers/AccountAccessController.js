import RegistrationService from '../services/RegistrationService.js'
import LoginService from '../services/LoginService.js'
import SchemaValidator from '../middlewares/validator/SchemaValidator.js'
import { User } from '../schema.js'
import { createErrorResponse } from '../../utils/error-response-utils.js'
import Controller_Endpoints from '../constants/controller-endpoints.js'

class AccountAccessController {
  constructor() {
    this._registrationService = new RegistrationService()
    this._loginService = new LoginService()
    this._userValidator = new SchemaValidator(User)
  }

  async isUsernameAvailable(username) {
    return await this._registrationService.isUsernameAvailable(username)
  }

  async registerUser(user) {
    try {
      this._userValidator.validate(user)
      return await this._registrationService.registerUser(user)
    } catch (error) {
      return createErrorResponse(400, error.message)
    }
  }

  async authenticateUser(user) {
    const { username, password } = user
    return await this._loginService.authenticateUser(username, password)
  }

  async getUserFromSessionId(sessionId) {
    return await this._loginService.getUserFromSessionId(sessionId)
  }
}

class AccountAccessEndpointsCaller {
  static endpoint = Controller_Endpoints.ACCOUNT_ACCESS
  static call(endpoint, data = null) {
    const controller = new AccountAccessController()
    switch (endpoint) {
      case `${this.endpoint}/exists`:
        return controller.isUsernameAvailable(data)
      case `${this.endpoint}/register`:
        return controller.registerUser(data)
      case `${this.endpoint}/login`:
        return controller.authenticateUser(data)
      case `${this.endpoint}/session`:
        return controller.getUserFromSessionId(data)
      default:
        return createErrorResponse(404, 'Endpoint not found')
    }
  }
}

export default AccountAccessEndpointsCaller
