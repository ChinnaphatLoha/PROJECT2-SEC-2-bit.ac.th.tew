import { getUsername } from '../schema/schema'
import { getMeetingDtoByProjectId } from './meeting-dto'

export const getProjectDTO = async (project) => {
  const meetings = await getMeetingDtoByProjectId(project.id)
  return {
    id: project.id,
    name: project.name,
    description: project.description,
    retrospectiveType: project.retrospective_type,
    authority: project.authority,
    owner: await getUsername(project.users.find((u) => u.authority === 'OWNER').userId),
    meetings
  }
}
