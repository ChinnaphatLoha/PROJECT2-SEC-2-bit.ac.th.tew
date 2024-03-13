import JsonServerRepository from '../connection/JsonServerRepository.js'
import { BASE_URL, endpoints } from '../../config/env.js'
import { getNewAccountDTO } from '../dto/account-dto.js'
import { TOKEN_KEY } from '../constants/token.js'
import { setCookie } from '@/backend/utils/cookie-session-utils.js'

class RegistrationService {
  constructor() {
    this._userRepository = new JsonServerRepository(BASE_URL, endpoints.user)
  }

  async isAvailable(queryParams) {
    const user = await this._userRepository.findFirst(queryParams)
    return { available: user === null, criteria: queryParams }
  }

  async registerUser(user) {
    const newUser = await this._userRepository.create(user)
    const newAccount = getNewAccountDTO(newUser)
    setCookie(TOKEN_KEY, newAccount)
    return newAccount
  }
}

export default RegistrationService
