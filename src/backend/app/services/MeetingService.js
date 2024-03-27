import JsonServerRepository from '../connection/JsonServerRepository.js'
import { BASE_URL, endpoints } from '../../config/env.js'
import { getMeetingsDTO } from '../dto/meeting-dto.js'

class MeetingService {
  constructor() {
    this._projectRepository = new JsonServerRepository(BASE_URL, endpoints.project)
    this._meetingRepository = new JsonServerRepository(BASE_URL, endpoints.meeting)
    this._feedbackRepository = new JsonServerRepository(BASE_URL, endpoints.feedback)
  }

  async _isProjectExist(projectId) {
    return this._projectRepository
      .findById(projectId)
      .then((project) => !!project)
      .catch(() => false)
  }

  _validateSchedule(start_date, end_date) {
    return new Date(start_date).getTime() < new Date(end_date).getTime()
  }

  async _getRelevantFeedbacks(meetingId) {
    return await this._feedbackRepository
      .findAll()
      .then((feedbacks) => feedbacks.filter((feedback) => feedback.meetingId === meetingId))
  }

  async getMeetingsByProjectId(projectId) {
    const meetings = await this._meetingRepository
      .findAll()
      .then((meetings) => meetings.filter((meeting) => meeting.projectId === projectId))
    const [feedbacks] = await Promise.all(
      meetings.map((meeting) => this._getRelevantFeedbacks(meeting.id))
    )
    return getMeetingsDTO(meetings, feedbacks)
  }

  async createMeeting(meeting) {
    const { projectId, start_date, end_date } = meeting
    if (!(await this._isProjectExist(projectId))) {
      return new Response(null, { status: 404, statusText: 'Project not found' })
    }
    if (!this._validateSchedule(start_date, end_date))
      return new Response(null, { status: 400, statusText: 'Invalid schedule' })
    const createdMeeting = await this._meetingRepository.create(meeting)
    const [meetingDTO] = await getMeetingsDTO([createdMeeting], [])
    return meetingDTO
  }

  async updateMeetingInfo(id, { topic, start_date = null, end_date = null, description = null }) {
    if (!id) return new Response(null, { status: 400, statusText: 'Meeting ID is required' })
    if (!start_date && !end_date && !description)
      return new Response(null, { status: 400, statusText: 'At least one field is required' })
    if (!this._validateSchedule(start_date, end_date) && (start_date || end_date))
      return new Response(null, { status: 400, statusText: 'Invalid schedule' })
    const updateData = {
      ...(topic !== null && { topic }),
      ...(start_date !== null && { start_date }),
      ...(end_date !== null && { end_date }),
      ...(description !== null && { description })
    }
    const updatedMeeting = await this._meetingRepository.update({ id }, updateData)
    const feedbacks = await this._getRelevantFeedbacks(id)
    const [meetingDTO] = await getMeetingsDTO([updatedMeeting], feedbacks)
    return meetingDTO
  }

  async deleteMeeting(id) {
    const deletedMeeting = await this._meetingRepository.delete({ id })
    const [meetingDTO] = await getMeetingsDTO([deletedMeeting], [])
    return meetingDTO
  }
}

export default MeetingService
