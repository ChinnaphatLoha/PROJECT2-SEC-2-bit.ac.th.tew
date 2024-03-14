import JsonServerRepository from '../connection/JsonServerRepository.js'
import { BASE_URL, endpoints } from '../../config/env.js'
import { getAccountDTO } from '../dto/account-dto.js'
import { generateToken, setCookie, decryptToken } from '@/backend/utils/cookie-session-utils.js'
import { TOKEN_KEY } from '../constants/token.js'

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
    const token = await generateToken(user.id)
    setCookie(TOKEN_KEY, token, import.meta.env.VITE_COOKIE_EXPIRATION)
    return {
      ...getAccountDTO(user, userProjects)
    }
  }

  async authenticateToken(Cookie) {
    const userId = await decryptToken(Cookie)
    const user = await this._userRepository.findById(userId).catch(() => null)
    if (!user) return new Response(null, { status: 401, statusText: 'Invalid session' })
    const userProjects = await this._getRelevantProjects(userId)
    return {
      ...getAccountDTO(user, userProjects)
    }
  }
}

export default LoginService
