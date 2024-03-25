import { getUsername } from '../schema/schema'

export const getProjectDTO = async (project) => ({
  id: project.id,
  name: project.name,
  description: project.description,
  retrospectiveType: project.retrospective_type,
  authority: project.authority,
  owner: await getUsername(project.users.find((u) => u.authority === 'OWNER').userId)
})
