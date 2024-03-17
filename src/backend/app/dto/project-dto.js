export const getProjectDTO = (project) => ({
  id: project.id,
  name: project.name,
  description: project.description,
  retrospectiveType: project.retrospective_type,
  authority: project.authority
})
