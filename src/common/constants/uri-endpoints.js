const ACCOUNT_ACCESS = '/api/account'
const PROJECT_ACCESS = '/api/project-composition'

const ACCOUNT_ENDPOINTS = {
  data: `${ACCOUNT_ACCESS}`,
  availability: `${ACCOUNT_ACCESS}/availability`,
  register: `${ACCOUNT_ACCESS}/register`,
  login: `${ACCOUNT_ACCESS}/login`,
  logout: `${ACCOUNT_ACCESS}/logout`
}

const PROJECT_ENDPOINTS = {
  project: `${PROJECT_ACCESS}/projects`,
  projectJoin: `${PROJECT_ACCESS}/projects/join`,
  meeting(pid) {
    return `${PROJECT_ACCESS}/meetings?pid=${pid}`
  },
  meetings: `${PROJECT_ACCESS}/meetings`,
}

export { ACCOUNT_ENDPOINTS, PROJECT_ENDPOINTS }
