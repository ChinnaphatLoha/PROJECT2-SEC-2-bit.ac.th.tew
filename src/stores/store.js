/* eslint-disable no-unused-vars */
import { defineStore } from 'pinia'
import Provider from '@/api/provider'
import { getCookie } from '@/common/utils/cookie-util'
import router from '@/router'
import { PROJECT_ATTRIBUTE } from '@/common/constants/project-attributes'
import { PROJECT_ENDPOINTS } from '@/common/constants/uri-endpoints'
import { AUTHORITY_VALUE } from '@/common/constants/authority-values'

const useUserStore = defineStore('user-store', {
  state: () => ({
    currentUser: null,
    ownedProject: [],
    membershipProject: []
  }),
  actions: {
    initializeProjects(projects) {
      if (!(projects.length === 0)) {
        this.ownedProject = projects.filter(
          (project) => project[PROJECT_ATTRIBUTE.users.authority] === AUTHORITY_VALUE.OWNER
        )
        this.membershipProject = projects.filter(
          (project) => project[PROJECT_ATTRIBUTE.users.authority] === AUTHORITY_VALUE.MEMBER
        )
      }
    },
    setCurrentUser(user) {
      this.currentUser = user
    },

    initializeStore(user, projects) {
      console.log('User Store initialized')
      this.setCurrentUser(user)
      this.initializeProjects(projects)
      router.push({ name: 'home' })
    },

    async createNewProject(projectCreationForm) {
      console.log('Create project')
      const projectData = {
        name: projectCreationForm.projectName,
        retrospective_type: projectCreationForm.retrospectiveType,
        passkey: projectCreationForm.passkey,
        description: projectCreationForm.description
      }
      const res = await Provider.request(PROJECT_ENDPOINTS.project, {
        method: 'POST',
        headers: {
          Cookie: getCookie('bit_tkn')
        },
        body: JSON.stringify(projectData)
      })
      const data = res.ok ? await res.json() : null
      console.log(data)
      if (res.ok) {
        this.ownedProject.push(data)
        router.push({ name: 'home', params: { id: data.pid } })
      }
    },
    async joinProject(projectJoinForm, showErrorCallback) {
      console.log('Join project')
      const res = await Provider.request(PROJECT_ENDPOINTS.projectJoin, {
        headers: {
          Cookie: getCookie('bit_tkn')
        },
        body: JSON.stringify({
          pid: projectJoinForm.projectId,
          passkey: projectJoinForm.joinPasskey
        })
      })
      const data = res.ok ? await res.json() : null
      console.log(data ?? res.statusText)
      if (res.ok) {
        console.log('Pushing new project')
        this.membershipProject.push(data)
        router.push({ name: 'home', params: { id: data.pid } })
      } else if (res.status === 409) {
        showErrorCallback('You have already joined this project')
      } else {
        showErrorCallback('Invalid passkey')
      }
    },
    removeOwnedProject(userId, projectId) {
      // remove Project
    },
    fetchMeetings(pid) {
      const res = Provider.request(PROJECT_ENDPOINTS.projectMeetingById(pid))
      const data = res.ok ? res.json() : null
      if (res.ok) {
        return data
      }
      return null
    }
  },
  getters: {
    user() {
      return this.currentUser
    },
    username() {
      return this.currentUser.username
    },
    meetings(pid) {
      return this.fetchMeetings(pid)
    }
  }
})

export { useUserStore }
