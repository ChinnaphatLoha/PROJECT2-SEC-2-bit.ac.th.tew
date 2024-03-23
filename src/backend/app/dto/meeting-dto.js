import { getAllUsers } from '../schema/schema'
import GroupByRetrospectiveTypes from '../constants/group-by-retrospective-types'
import JsonServerRepository from '../connection/JsonServerRepository'
import { BASE_URL, endpoints } from '../../config/env'

const projectRepository = new JsonServerRepository(BASE_URL, endpoints.project)
const getRetrospectiveType = (pid) =>
  projectRepository.findById(pid).then(({ retrospective_type }) => retrospective_type)

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

const getGroupTemplate = (retrospective_type) => {
  const groups = GroupByRetrospectiveTypes[retrospective_type]
  return groups.map((group) => ({ group }))
}

export const getMeetingsDTO = async (meetings = [], feedbacks = []) => {
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
    const feedbackRecords = removeNullItemInFeedback(
      removeGroupPropertyFromFeedback(uncleanedFeedbackRecords)
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
