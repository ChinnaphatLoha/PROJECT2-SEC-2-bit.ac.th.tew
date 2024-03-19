import JsonServerRepository from '../connection/JsonServerRepository.js'
import { BASE_URL, endpoints } from '../../config/env.js'
import { getMeetingsDTO } from '../dto/meeting-dto.js'

class MeetingService {
  constructor() {
    this._meetingRepository = new JsonServerRepository(BASE_URL, endpoints.meeting)
    this._feedbackRepository = new JsonServerRepository(BASE_URL, endpoints.feedback)
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
    return await getMeetingsDTO(meetings, feedbacks)
  }
}

export default MeetingService
