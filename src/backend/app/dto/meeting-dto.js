import { getAllUsers } from '../schema/schema'
import GroupByRetrospectiveTypes from '../constants/group-by-retrospective-types'
import MeetingService from '../services/MeetingService'
import JsonServerRepository from '../connection/JsonServerRepository'
import { BASE_URL, endpoints } from '../../config/env'

const _meetingService = new MeetingService()
const _meetingRepository = new JsonServerRepository(BASE_URL, endpoints.meeting)
const _projectRepository = new JsonServerRepository(BASE_URL, endpoints.project)
const getRetrospectiveType = (pid) =>
  _projectRepository.findById(pid).then(({ retrospective_type }) => retrospective_type)

const removeGroupPropertyFromFeedback = (feedback) => {
  const feedbackRecords = {}
  for (const key in feedback) {
    // eslint-disable-next-line no-unused-vars
    feedbackRecords[key] = feedback[key].map(({ group, ...rest }) => rest)
  }
  return feedbackRecords
}

const removeNullItemInFeedback = (feedback) => {
  const feedbackRecords = {}
  for (const key in feedback) {
    feedbackRecords[key] = feedback[key].filter((item) => item.content && item.username)
  }
  return feedbackRecords
}

const sortObjectByOrder = (data, sortOrder) => {
  const keys = Object.keys(data)
    .filter((key) => !sortOrder.includes(key))
    .concat(sortOrder)

  return keys.reduce((acc, key) => {
    acc[key] = data[key]
    return acc
  }, {})
}

const getGroupTemplate = (retrospective_type) => {
  const groups = GroupByRetrospectiveTypes[retrospective_type]
  return groups.map((group) => ({ group }))
}

export const getMeetingsDTO = async (meetings = [], feedbacks = []) => {
  if (!meetings.length) return []
  const { projectId } = meetings[0]
  const retrospective_type = await getRetrospectiveType(projectId)
  const groups = getGroupTemplate(retrospective_type)
  feedbacks.push(...groups)
  const ALL_USERS = await getAllUsers()
  const meetingsDTO = meetings.map((meeting) => {
    const uncleanedFeedbackRecords = Object.groupBy(
      feedbacks.map((feedback) => {
        const content = feedback.text || ''
        const user = ALL_USERS.find((user) => user.id === feedback.userId)
        const username = user?.username || ''
        return {
          content,
          group: feedback.group,
          username
        }
      }),
      ({ group }) => group
    )
    const feedbackRecords = sortObjectByOrder(
      removeNullItemInFeedback(removeGroupPropertyFromFeedback(uncleanedFeedbackRecords)),
      GroupByRetrospectiveTypes[retrospective_type]
    )
    return {
      id: meeting.id,
      projectId: meeting.projectId,
      topic: meeting.topic,
      start_date: meeting.start_date,
      end_date: meeting.end_date,
      description: meeting.description,
      feedbackRecords
    }
  })
  return meetingsDTO
}

export const getMeetingDtoByProjectId = async (projectId) => {
  const meetings = await _meetingRepository.findMany({ projectId })
  if (!meetings) return []
  const [feedbacks] = await Promise.all(
    meetings.map((meeting) => _meetingService._getRelevantFeedbacks(meeting.id))
  )
  return await getMeetingsDTO(meetings, feedbacks)
}
