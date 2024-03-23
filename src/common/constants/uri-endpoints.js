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
  project_mutate: (pid) => `${PROJECT_ACCESS}/projects?pid=${pid}`,
  projectJoin: `${PROJECT_ACCESS}/projects/join`,
  meeting: (pid) => `${PROJECT_ACCESS}/meetings?pid=${pid}`,
  meeting_mutate: (mid) => `${PROJECT_ACCESS}/meetings?mid=${mid}`,
  meetings: `${PROJECT_ACCESS}/meetings`
}

export { ACCOUNT_ENDPOINTS, PROJECT_ENDPOINTS }
