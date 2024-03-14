import JsonServerRepository from '../connection/JsonServerRepository.js'
import { BASE_URL, endpoints } from '../../config/env.js'
import { getAccountDTO } from '../dto/account-dto.js'
import { generateSessionId, getSessionUserId } from '../../utils/cookie-session-utils.js'

class LoginService {
  constructor() {
    this._userRepository = new JsonServerRepository(BASE_URL, endpoints.user)
    this._projectRepository = new JsonServerRepository(BASE_URL, endpoints.project)
  }

  async _getRelevantProjects(userId) {
    const projects = await this._projectRepository
      .findAll()
      .then((projects) =>
        projects.filter((project) => project.users.some((user) => user.userId === userId))
      )
    return projects
  }

  async authenticateUser(username, password) {
    const user = await this._userRepository.findFirst({
      username,
      password
    })
    if (!user) return new Response(null, { status: 401, statusText: 'Invalid credentials' })
    const userProjects = await this._getRelevantProjects(user.id)
    return {
      sessionId: generateSessionId(user.id),
      ...getAccountDTO(user, userProjects)
    }
  }

  async getUserFromSessionId(sessionId) {
    const userId = getSessionUserId(sessionId)
    const user = await this._userRepository.findById(userId).catch(() => null)
    if (!user) return new Response(null, { status: 401, statusText: 'Invalid session' })
    const userProjects = await this._getRelevantProjects(userId)
    return {
      sessionId: generateSessionId(user.id),
      ...getAccountDTO(user, userProjects)
    }
  }
}

export default LoginService
