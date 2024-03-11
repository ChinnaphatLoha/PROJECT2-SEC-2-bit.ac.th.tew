const DEV_URL = 'http://localhost:3001'
const ACCOUNT_ACCESS = '/api/account'

const ACCOUNT_ENDPOINTS = {
    availability : `${DEV_URL}${ACCOUNT_ACCESS}/availability`,
    register : `${DEV_URL}${ACCOUNT_ACCESS}/register`,
    login : `${DEV_URL}${ACCOUNT_ACCESS}/login`,
    session : `${DEV_URL}${ACCOUNT_ACCESS}/session`
}

export default {
    ACCOUNT_ENDPOINTS
}