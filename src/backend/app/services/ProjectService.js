import JsonServerRepository from '../connection/JsonServerRepository.js'
import { BASE_URL, endpoints } from '../../config/env.js'
import AuthorityTypes from '../constants/authority-types.js'
import { getProjectDTO } from '../dto/project-dto.js'

class ProjectService {
  constructor() {
    this._projectRepository = new JsonServerRepository(BASE_URL, endpoints.project)
  }

  async createProject(project) {
    const builtProject = await this._projectRepository.create(project)
    delete builtProject.users
    delete builtProject.passkey
    return { ...builtProject, authority: AuthorityTypes.OWNER }
  }

  async updateProjectInfo({ id, name = null, description = null }) {
    if (!id) return new Response(null, { status: 400, statusText: 'Project ID is required' })
    if (!name && !description)
      return new Response(null, { status: 400, statusText: 'At least one field is required' })
    const updateData = {
      ...(name !== null && { name }),
      ...(description !== null && { description })
    }
    const updatedProject = await this._projectRepository.update({ id }, updateData)
    return getProjectDTO(updatedProject)
  }

  async addNewMember({ id, userId, passkey }) {
    if (!id || !userId || !passkey)
      return new Response(null, { status: 400, statusText: 'Project ID, user ID, and passkey are required' })
    const project = await this._projectRepository.findById(id)
    if (!project) return new Response(null, { status: 404, statusText: 'Project not found' })
    if (project.passkey !== passkey)
      return new Response(null, { status: 401, statusText: 'Invalid passkey' })
    if (project.users.some((user) => user.userId === userId))
      return new Response(null, { status: 409, statusText: 'User is already a member' })
    const updatedProject = await this._projectRepository.update(
      { id },
      { users: [...project.users, { userId, authority: AuthorityTypes.MEMBER }] }
    )
    return getProjectDTO(updatedProject, userId)
  }

  async deleteProject(id) {
    if (!id) return new Response(null, { status: 400, statusText: 'Project ID is required' })
    const deletedProject = await this._projectRepository.delete({ id })
    return getProjectDTO(deletedProject)
  }
}

export default ProjectService
