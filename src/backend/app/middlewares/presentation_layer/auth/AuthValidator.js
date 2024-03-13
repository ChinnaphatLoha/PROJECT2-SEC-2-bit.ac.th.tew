import { getCookie } from '@/backend/utils/cookie-session-utils'
import { TOKEN_KEY } from '@/backend/app/constants/token'

class AuthValidator {
  static TOKEN_KEY = TOKEN_KEY
  static authorized = false

  static checkAuth() {
    const token = getCookie(this.TOKEN_KEY)
    this.authorized = !!token
    return this
  }
}

export default AuthValidator
