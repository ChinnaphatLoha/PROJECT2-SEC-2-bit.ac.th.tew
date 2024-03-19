const ACCOUNT_ACCESS = '/api/account'

const ACCOUNT_ENDPOINTS = {
  availability: `${ACCOUNT_ACCESS}/availability`,
  register: `${ACCOUNT_ACCESS}/register`,
  login: `${ACCOUNT_ACCESS}/login`,
  session: `${ACCOUNT_ACCESS}/session`
}

const PROJECT_ENDPOINTS = {
  project: '/api/project-composition/projects',
  projectById: (projectId) => `/api/project-composition/projects/${projectId}`,
  projectJoin: '/api/project-composition/projects/join',
}

export { ACCOUNT_ENDPOINTS, PROJECT_ENDPOINTS }
