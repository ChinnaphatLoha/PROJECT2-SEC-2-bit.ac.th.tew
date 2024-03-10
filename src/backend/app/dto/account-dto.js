export const getNewAccountDTO = (newUser) => {
  return {
    id: newUser.id,
    username: newUser.username,
    projects: []
  }
}

export const getAccountDTO = (user, userProjects) => {
  return {
    id: user.id,
    username: user.username,
    projects: userProjects.map((project) => ({
      id: project.id,
      name: project.name,
      description: project.description,
      retrospectiveType: project.retrospective_type,
      authority: project.users.find((u) => u.userId === user.id).authority
    }))
  }
}
