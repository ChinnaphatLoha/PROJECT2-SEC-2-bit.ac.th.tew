/* eslint-disable no-unused-vars */
import MeetingService from '../services/MeetingService'
import Controller_Endpoints from '../constants/controller-endpoints.js'
import { extractEndpointToObject, extractQueryParams } from '../../utils/api-utils.js'
import { getCookie } from '@/backend/utils/cookie-session-utils'
import { TOKEN_KEY } from '../constants/token'

class ProjectCompositionController {
  constructor() {
    this._meetingService = new MeetingService()
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
    if (!getCookie(TOKEN_KEY))
      return new Response(null, { status: 401, statusText: 'Unauthorized' })
    const controller = new ProjectCompositionController()
    const { endpoint, query } = extractEndpointToObject(uri)
    const body = init?.body ? JSON.parse(init.body) : null
    const headers = init?.headers ? init.headers : null
    switch (endpoint) {
      case `${this.endpoint}/meetings`:
        return controller.getMeetingsByProjectId(query)
      default:
        return new Response(null, { status: 404, statusText: 'Endpoint not found' })
    }
  }
}

export default ProjectCompositionEndpointsCaller
