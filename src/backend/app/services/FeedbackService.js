import JsonServerRepository from '../connection/JsonServerRepository.js'
import { BASE_URL, endpoints } from '../../config/env.js'
import { getMeetingsDTO } from '../dto/meeting-dto.js'
import MeetingService from './MeetingService.js'

class FeedbackService {
  constructor() {
    this._meetingRepository = new JsonServerRepository(BASE_URL, endpoints.meeting)
    this._feedbackRepository = new JsonServerRepository(BASE_URL, endpoints.feedback)
    this._voteRepository = new JsonServerRepository(BASE_URL, endpoints.vote)
    this.meetingService = new MeetingService()
  }

  async _checkUniqueVote(vote) {
    const { feedbackId, userId } = vote
    const votes = await this._voteRepository.findMany({ feedbackId, userId })
    return votes.length === 0
  }

  async getFeedbacksByMeetingId(meetingId) {
    const meeting = await this._meetingRepository.findById(meetingId)
    if (!meeting) return new Response(null, { status: 404, statusText: `Meeting id: ${meetingId} not found` })
    const feedbacks = await this.meetingService._getRelevantFeedbacks(meetingId)
    const [meetingDTO] = await getMeetingsDTO([meeting], feedbacks)
    const {id, projectId, feedbackRecords} = meetingDTO
    return {mid: id, pid: projectId, feedbackRecords}
  }

  async createFeedback(feedback) {
    return await this._feedbackRepository.create(feedback)
  }

  async voteFeedback(vote) {
    const isUnique = await this._checkUniqueVote(vote)
    if (!isUnique) return new Response(null, { status: 400, statusText: 'Vote already exists' })
    return await this._voteRepository.create(vote)
  }

  async unvoteFeedback(vote) {
    const votes = await this._voteRepository.findMany(vote)
    if (votes.length === 0) return new Response(null, { status: 400, statusText: 'Vote not found' })
    return await this._voteRepository.delete(vote)
  }
}

export default FeedbackService
