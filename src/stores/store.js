/* eslint-disable no-unused-vars */
import { defineStore } from 'pinia'
import Provider from '@/api/provider'
import { getCookie } from '@/common/utils/cookie-util'
import router from '@/router'
import { ACCOUNT_ENDPOINTS } from '@/common/constants/uri-endpoints'
import { PROJECT_ATTRIBUTE } from '@/common/constants/project-attributes'
import { PROJECT_ENDPOINTS } from '@/common/constants/uri-endpoints'
import { AUTHORITY_VALUE } from '@/common/constants/authority-values'
import randomUUID from '@/common/utils/uuid'

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

    async checkAvailableUsername(username) {
      const res = await Provider.request(ACCOUNT_ENDPOINTS.availability + `?username=${username}`)
      const data = res.ok ? await res.json() : null
      if (data.available === true) {
        return true
      } else {
        return false
      }
    },

    async registerNewUser(username, callbackError) {
      const newUser = {
        username: '',
        password: ''
      }
      if ((await this.checkAvailableUsername(username)) === false) {
        await callbackError('Username is already taken')
        return
      } else {
        newUser.username = username
        newUser.password = randomUUID()
        const res = await Provider.request(ACCOUNT_ENDPOINTS.register, {
          body: JSON.stringify(newUser)
        })
        const data = res.ok ? await res.json() : null
        if (!res.ok) {
          await callbackError('Failed to register new user')
          return
        }
        console.log('registerNewUser is done')
        console.log(data)
        this.initializeStore({ id: data.id, username: data.username }, data.projects)
      }
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
    async joinProject(projectJoinForm, callbackError) {
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
        callbackError('You have already joined this project')
      } else {
        callbackError('Invalid passkey')
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
