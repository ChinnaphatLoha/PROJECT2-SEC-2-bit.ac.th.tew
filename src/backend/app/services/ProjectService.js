import JsonServerRepository from '../connection/JsonServerRepository.js'
import { BASE_URL, endpoints } from '../../config/env.js'
import { getProjectDTO } from '../dto/project-dto.js'
import AuthorityTypes from '../constants/authority-types.js'
import { generateToken, decryptToken } from '@/backend/utils/cookie-session-utils.js'

class ProjectService {
  constructor() {
    this._projectRepository = new JsonServerRepository(BASE_URL, endpoints.project)
  }

  async createProject(project) {
    project.passkey = await generateToken(project.passkey, import.meta.env.DB_PASSWORD)
    const builtProject = await this._projectRepository.create(project)
    return getProjectDTO({ ...builtProject, authority: AuthorityTypes.OWNER })
  }

  async updateProjectInfo(id, { name = null, description = null }) {
    if (!id) return new Response(null, { status: 400, statusText: 'Project ID is required' })
    if (!name && !description)
      return new Response(null, { status: 400, statusText: 'At least one field is required' })
    const updateData = {
      ...(name !== null && { name }),
      ...(description !== null && { description })
    }
    const updatedProject = await this._projectRepository.update({ id }, updateData)
    return getProjectDTO({ ...updatedProject, authority: AuthorityTypes.OWNER })
  }

  async addNewMember({ id, userId, passkey }) {
    if (!id || !userId || !passkey)
      return new Response(null, {
        status: 400,
        statusText: 'Project ID, user ID, and passkey are required'
      })
    const project = await this._projectRepository.findById(id)
    if (!project) return new Response(null, { status: 404, statusText: 'Project not found' })
    const encryptedPasskey = project.passkey
    const decryptedPasskey = await decryptToken(encryptedPasskey, import.meta.env.DB_PASSWORD)
    if (decryptedPasskey !== passkey)
      return new Response(null, { status: 401, statusText: 'Invalid passkey' })
    if (project.users.some((user) => user.userId === userId))
      return new Response(null, { status: 409, statusText: 'User is already a member' })
    const updatedProject = await this._projectRepository.update(
      { id },
      { users: [...project.users, { userId, authority: AuthorityTypes.MEMBER }] }
    )
    return getProjectDTO(updatedProject)
  }

  async deleteProject(id) {
    const deletedProject = await this._projectRepository.delete({ id })
    return getProjectDTO({ ...deletedProject, authority: AuthorityTypes.OWNER })
  }
}

export default ProjectService
