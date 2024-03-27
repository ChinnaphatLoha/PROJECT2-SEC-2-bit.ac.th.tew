import { getUsername } from '../schema/schema'
import { getMeetingDtoByProjectId } from './meeting-dto'

export const getNewAccountDTO = (newUser) => {
  return {
    id: newUser.id,
    username: newUser.username,
    projects: []
  }
}

export const getAccountDTO = async (user, userProjects) => {
  return {
    id: user.id,
    username: user.username,
    projects: await Promise.all(
      userProjects.map(async (project) => {
        const meetingsDTO = await getMeetingDtoByProjectId(project.id)
        return {
          id: project.id,
          name: project.name,
          description: project.description,
          retrospectiveType: project.retrospective_type,
          authority: project.users.find((u) => u.userId === user.id).authority,
          owner: await getUsername(project.users.find((u) => u.authority === 'OWNER').userId),
          meetings: meetingsDTO || []
        }
      })
    )
  }
}
