import { getAllUsers } from '../schema'

const removeGroupPropertyFromFeedback = (feedback) => {
  const feedbackRecords = {}
  for (const key in feedback) {
    // eslint-disable-next-line no-unused-vars
    feedbackRecords[key] = feedback[key].map(({ group, ...rest }) => rest)
  }
  return feedbackRecords
}

export const getMeetingsDTO = async (meetings, feedbacks) => {
  const ALL_USERS = await getAllUsers()
  const meetingsDTO = meetings.map((meeting) => {
    const uncleanedFeedbackRecords = Object.groupBy(
      feedbacks.map((feedback) => ({
        content: feedback.text,
        group: feedback.group,
        username: ALL_USERS.find((user) => user.id === feedback.userId).username
      })),
      ({ group }) => group
    )
    return {
      id: meeting.id,
      start_date: meeting.start_date,
      end_date: meeting.end_date,
      description: meeting.description,
      feedbackRecords: removeGroupPropertyFromFeedback(uncleanedFeedbackRecords)
    }
  })
  return meetingsDTO
}
