import JsonServerRepository from '../connection/JsonServerRepository.js'
import { BASE_URL, endpoints } from '../../config/env.js'

class FeedbackService {
  constructor() {
    this._feedbackRepository = new JsonServerRepository(BASE_URL, endpoints.feedback)
    this._voteRepository = new JsonServerRepository(BASE_URL, endpoints.vote)
  }

  async _checkUniqueVote(vote) {
    const { feedbackId, userId } = vote
    const votes = await this._voteRepository.findMany({ feedbackId, userId })
    return votes.length === 0
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
