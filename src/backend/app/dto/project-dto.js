export const getProjectDTO = (project, userId) => ({
  id: project.id,
  name: project.name,
  description: project.description,
  retrospectiveType: project.retrospective_type,
  authority: project.users.find((u) => u.userId === userId).authority
})
