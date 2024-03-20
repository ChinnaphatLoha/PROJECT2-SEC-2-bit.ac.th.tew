import ProjectService from '../services/ProjectService'
import MeetingService from '../services/MeetingService'
import FeedbackService from '../services/FeedbackService'
import SchemaValidator from '../middlewares/validator/SchemaValidator.js'
import { Project, Meeting, Feedback, Vote } from '../schema/schema.js'
import Controller_Endpoints from '../constants/controller-endpoints.js'
import { extractEndpointToObject, extractQueryParams } from '../../utils/api-utils.js'
import AuthValidator from '../middlewares/auth/AuthValidator'
import AuthorityTypes from '../constants/authority-types'
import { decryptToken } from '@/backend/utils/cookie-session-utils'

class ProjectCompositionController {
  constructor() {
    this._projectService = new ProjectService()
    this._meetingService = new MeetingService()
    this._feedbackService = new FeedbackService()
    this._projectValidator = new SchemaValidator(Project)
    this._meetingValidator = new SchemaValidator(Meeting)
    this._feedbackValidator = new SchemaValidator(Feedback)
    this._voteValidator = new SchemaValidator(Vote)
  }

  async createProject({ Cookie }, project) {
    const userId = await decryptToken(Cookie, import.meta.env.DB_PASSWORD)
    project = {
      ...project,
      users: [{ userId, authority: AuthorityTypes.OWNER }]
    }
    const validatedProject = await this._projectValidator.validate(project)
    const data = await this._projectService.createProject(validatedProject)
    return new Response(JSON.stringify(data), { status: 201 })
  }

  async updateProjectInfo({ pid }, projectInfo) {
    const dataOrResponse = await this._projectService.updateProjectInfo(pid, projectInfo)
    if (dataOrResponse instanceof Response) return dataOrResponse
    return new Response(JSON.stringify(dataOrResponse), { status: 200 })
  }

  async joinToProject({ Cookie }, { pid, passkey }) {
    const userId = await decryptToken(Cookie, import.meta.env.DB_PASSWORD)
    const dataOrResponse = await this._projectService.addNewMember({ id: pid, userId, passkey })
    if (dataOrResponse instanceof Response) return dataOrResponse
    return new Response(JSON.stringify(dataOrResponse), { status: 200 })
  }

  async deleteProject({ pid }) {
    return this._projectService.deleteProject(pid)
  }

  async getMeetingsByProjectId({ pid }) {
    const data = await this._meetingService.getMeetingsByProjectId(pid)
    if (!data) return new Response(null, { status: 404, statusText: 'No meetings found' })
    return new Response(JSON.stringify(data), { status: 200 })
  }

  async createMeeting(meeting) {
    const validatedMeeting = await this._meetingValidator.validate(meeting)
    const dataOrResponse = await this._meetingService.createMeeting(validatedMeeting)
    if (dataOrResponse instanceof Response) return dataOrResponse
    return new Response(JSON.stringify(dataOrResponse), { status: 201 })
  }

  async updateMeetingInfo({ mid }, meetingInfo) {
    const dataOrResponse = await this._meetingService.updateMeetingInfo(mid, meetingInfo)
    if (dataOrResponse instanceof Response) return dataOrResponse
    return new Response(JSON.stringify(dataOrResponse), { status: 200 })
  }

  async deleteMeeting({ mid }) {
    return this._meetingService.deleteMeeting(mid)
  }

  async createFeedback(feedback) {
    const validatedFeedback = await this._feedbackValidator.validate(feedback)
    const data = await this._feedbackService.createFeedback(validatedFeedback)
    return new Response(JSON.stringify(data), { status: 201 })
  }

  async voteFeedback(vote) {
    const validatedVote = await this._voteValidator.validate(vote)
    const dataOrResponse = await this._feedbackService.voteFeedback(validatedVote)
    if (dataOrResponse instanceof Response) return dataOrResponse
    return new Response(JSON.stringify(dataOrResponse), { status: 201 })
  }

  async unvoteFeedback(vote) {
    const validatedVote = await this._voteValidator.validate(vote)
    const dataOrResponse = await this._feedbackService.unvoteFeedback(validatedVote)
    if (dataOrResponse instanceof Response) return dataOrResponse
    return new Response(JSON.stringify(dataOrResponse), { status: 200 })
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
    const q = query ? extractQueryParams(query) : null
    const body = init?.body ? JSON.parse(init.body) : null
    const headers = init?.headers ? init.headers : null
    const method = init?.method ? init.method : 'GET'
    switch (endpoint) {
      case `${this.endpoint}/projects`:
        switch (method) {
          case 'POST':
            return controller.createProject(headers, body)
          case 'PATCH':
            return controller.updateProjectInfo(q, body)
          case 'DELETE':
            return controller.deleteProject(q)
          default:
            return new Response(null, { status: 404, statusText: 'Endpoint not found' })
        }
      case `${this.endpoint}/projects/join`:
        return controller.joinToProject(headers, body)
      case `${this.endpoint}/meetings`:
        switch (method) {
          case 'GET':
            return controller.getMeetingsByProjectId(q)
          case 'POST':
            return controller.createMeeting(body)
          case 'PATCH':
            return controller.updateMeetingInfo(q, body)
          case 'DELETE':
            return controller.deleteMeeting(q)
          default:
            return new Response(null, { status: 404, statusText: 'Endpoint not found' })
        }
      case `${this.endpoint}/meetings/feedbacks`:
        switch (method) {
          case 'POST':
            return controller.createFeedback(body)
          default:
            return new Response(null, { status: 404, statusText: 'Endpoint not found' })
        }
      case `${this.endpoint}/meetings/feedbacks/vote`:
        switch (method) {
          case 'POST':
            return controller.voteFeedback(body)
          case 'DELETE':
            return controller.unvoteFeedback(body)
          default:
            return new Response(null, { status: 404, statusText: 'Endpoint not found' })
        }
      default:
        return new Response(null, { status: 404, statusText: 'Endpoint not found' })
    }
  }
}

export default ProjectCompositionEndpointsCaller
