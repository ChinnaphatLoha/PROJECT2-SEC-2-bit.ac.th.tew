import ProjectService from '../services/ProjectService'
import MeetingService from '../services/MeetingService'
import SchemaValidator from '../middlewares/validator/SchemaValidator.js'
import { Project } from '../schema/schema.js'
import Controller_Endpoints from '../constants/controller-endpoints.js'
import { extractEndpointToObject, extractQueryParams } from '../../utils/api-utils.js'
import AuthValidator from '../middlewares/auth/AuthValidator'
import AuthorityTypes from '../constants/authority-types'
import { decryptToken } from '@/backend/utils/cookie-session-utils'

class ProjectCompositionController {
  constructor() {
    this._projectService = new ProjectService()
    this._meetingService = new MeetingService()
    this._projectValidator = new SchemaValidator(Project)
  }

  async createProject({ Cookie }, project) {
    project = {
      ...project,
      users: [{ userId: await decryptToken(Cookie), authority: AuthorityTypes.OWNER }]
    }
    const validatedProject = await this._projectValidator.validate(project)
    const data = await this._projectService.createProject(validatedProject)
    return new Response(JSON.stringify(data), { status: 201 })
  }

  async updateProjectInfo(projectInfo) {
    const dataOrResponse = await this._projectService.updateProjectInfo(projectInfo)
    if (dataOrResponse instanceof Response) return dataOrResponse
    return new Response(JSON.stringify(dataOrResponse), { status: 200 })
  }

  async joinToProject({ Cookie }, { pid, passkey }) {
    const userId = await decryptToken(Cookie)
    const dataOrResponse = await this._projectService.addNewMember({ id: pid, userId, passkey })
    if (dataOrResponse instanceof Response) return dataOrResponse
    return new Response(JSON.stringify(dataOrResponse), { status: 200 })
  }

  async deleteProject({ pid }) {
    return this._projectService.deleteProject({ id: pid, _dependent: 'meetings' })
  }

  async getMeetingsByProjectId(queryString) {
    const { pid } = extractQueryParams(queryString)
    const data = await this._meetingService.getMeetingsByProjectId(pid)
    if (!data) return new Response(null, { status: 404, statusText: 'No meetings found' })
    return new Response(JSON.stringify(data), { status: 200 })
  }
}

class ProjectCompositionEndpointsCaller {
  static endpoint = Controller_Endpoints.PROJECT_COMPOSITION
  static call(uri, init = null) {
    AuthValidator.checkAuth()
    if (!AuthValidator.authorized) {
      return new Response(null, { status: 401, statusText: 'Unauthorized' })
    }
    const controller = new ProjectCompositionController()
    const { endpoint, query } = extractEndpointToObject(uri)
    const body = init?.body ? JSON.parse(init.body) : null
    const headers = init?.headers ? init.headers : null
    const method = init?.method ? init.method : 'GET'
    switch (endpoint) {
      case `${this.endpoint}/projects`:
        switch (method) {
          case 'POST':
            return controller.createProject(headers, body)
          case 'PATCH':
            return controller.updateProjectInfo(body)
          case 'DELETE':
            return controller.deleteProject(body)
          default:
            return new Response(null, { status: 404, statusText: 'Endpoint not found' })
        }
      case `${this.endpoint}/projects/join`:
        return controller.joinToProject(headers, body)
      case `${this.endpoint}/meetings`:
        return controller.getMeetingsByProjectId(query)
      default:
        return new Response(null, { status: 404, statusText: 'Endpoint not found' })
    }
  }
}

export default ProjectCompositionEndpointsCaller
