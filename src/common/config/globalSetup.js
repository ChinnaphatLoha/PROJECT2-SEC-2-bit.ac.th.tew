import { ref, onMounted } from 'vue'
import { TOKEN_KEY } from '@/backend/app/constants/token'
import { setCookie } from '@/backend/utils/cookie-session-utils'
import { getCookie } from '../utils/cookie-util'

const setup = () => {
  const isCookieExpired = ref(false)

  const checkCookieExpiration = () => {
    const cookieExpiration = localStorage.getItem('cookieExpiration')
    const token = getCookie(TOKEN_KEY)
    if (cookieExpiration) {
      if (!token) {
        isCookieExpired.value = true
        return
      }
      const expirationDate = new Date(cookieExpiration)
      const currentDate = new Date()
      isCookieExpired.value = expirationDate < currentDate
    } else {
      isCookieExpired.value = true
      setCookie(TOKEN_KEY, '', -1)
    }
  }

  onMounted(() => {
    checkCookieExpiration()
    if (isCookieExpired.value) {
      localStorage.clear()
    }
  })
}

export default setup
