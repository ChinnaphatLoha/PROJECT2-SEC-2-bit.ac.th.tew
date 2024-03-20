const ACCOUNT_ACCESS = '/api/account'

const ACCOUNT_ENDPOINTS = {
  availability: `${ACCOUNT_ACCESS}/availability`,
  register: `${ACCOUNT_ACCESS}/register`,
  login: `${ACCOUNT_ACCESS}/login`,
  session: `${ACCOUNT_ACCESS}/session`
}

const PROJECT_ENDPOINTS = {
  project: '/api/project-composition/projects',
  projectJoin: '/api/project-composition/projects/join',
  projectMeetingById(pid) {
    return `/api/project-composition/meetings?pid=${pid}`
  }
}

export { ACCOUNT_ENDPOINTS, PROJECT_ENDPOINTS }
