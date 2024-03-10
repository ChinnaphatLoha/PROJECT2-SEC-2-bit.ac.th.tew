import JsonServerRepository from '../connection/JsonServerRepository.js'
import { BASE_URL, endpoints } from '../../config/env.js'
import { getNewAccountDTO } from '../dto/account-dto.js'

class RegistrationService {
  constructor() {
    this._userRepository = new JsonServerRepository(BASE_URL, endpoints.user)
  }

  async isUsernameAvailable(username) {
    const user = await this._userRepository.findFirst({ username })
    return user === null
  }

  async registerUser(user) {
    const newUser = await this._userRepository.create(user)
    return getNewAccountDTO(newUser)
  }
}

export default RegistrationService
