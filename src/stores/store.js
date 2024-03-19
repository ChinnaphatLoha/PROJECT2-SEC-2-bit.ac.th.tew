/* eslint-disable no-unused-vars */
import { defineStore } from 'pinia'
import Provider from '@/api/provider'
import { getCookie } from '@/common/utils/cookie-util'
import router from '@/router'
import { PROJECT_ATTRIBUTE } from '@/common/constants/project-attributes'
import { PROJECT_ENDPOINTS } from '@/common/constants/uri-endpoints'

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
          (project) => project[PROJECT_ATTRIBUTE.users.authority] === 'OWNER'
        )
        this.membershipProject = projects.filter(
          (project) => project[PROJECT_ATTRIBUTE.users.authority] === 'MEMBER'
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
        console.log('New project pushed on ownedProject' + data.pid)
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
  },
  getters: {
    getUser() {
      return this.currentUser
    },
    getUsername() {
      return this.currentUser.username
    },
    getOwnedProject() {
      return this.ownedProject
    },
    getMembershipProject() {
      return this.membershipProject
    },
    getMeetings() {

    }
  }
})

export { useUserStore }
