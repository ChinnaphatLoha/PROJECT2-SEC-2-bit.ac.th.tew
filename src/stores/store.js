/* eslint-disable no-unused-vars */
import { defineStore } from 'pinia'
import Provider from '@/api/provider'
import { getCookie } from '@/common/utils/cookie-util'
import router from '@/router'
import { ACCOUNT_ENDPOINTS } from '@/common/constants/uri-endpoints'
import { PROJECT_ATTRIBUTE } from '@/common/constants/project-attributes'
import { PROJECT_ENDPOINTS } from '@/common/constants/uri-endpoints'
import { AUTHORITY_VALUE } from '@/common/constants/authority-values'

const useUserStore = defineStore('user-store', {
  state: () => ({
    currentUser: null,
    ownedProjects: [],
    membershipProjects: [],
    currentProjectId: null,
    currentMeetingId: null
  }),
  actions: {
    saveDataToLocal() {
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
      localStorage.setItem('ownedProjects', JSON.stringify(this.ownedProjects))
      localStorage.setItem('membershipProjects', JSON.stringify(this.membershipProjects))
    },

    fetchDataFromLocal() {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
      this.ownedProjects = JSON.parse(localStorage.getItem('ownedProjects'))
      this.membershipProjects = JSON.parse(localStorage.getItem('membershipProjects'))
    },

    clearDataFromLocal() {
      localStorage.removeItem('currentUser')
      localStorage.removeItem('ownedProjects')
      localStorage.removeItem('membershipProjects')
    },

    initializeProjects(projects) {
      if (!(projects.length === 0)) {
        this.ownedProjects = projects.filter(
          (project) => project[PROJECT_ATTRIBUTE.users.authority] === AUTHORITY_VALUE.OWNER
        )
        this.membershipProjects = projects.filter(
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
      this.saveDataToLocal()
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

    async registerNewUser(username, password, callbackError) {
      const newUser = {
        username: '',
        password: ''
      }
      if ((await this.checkAvailableUsername(username)) === false) {
        await callbackError('Username is already taken')
        return
      } else {
        newUser.username = username
        newUser.password = password
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

    async logout() {
      const res = await Provider.request(ACCOUNT_ENDPOINTS.logout)
      if (!res.ok) {
        console.log('Failed to logout')
        return
      }
      this.clearDataFromLocal()
      router.push({ name: 'login' })
    },

    onProject(pid) {
      this.currentProjectId = pid
    },
    onMeeting(mid) {
      this.currentMeetingId = mid
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
      if (res.ok) {
        this.ownedProjects.push(data)
        router.push({ name: 'home', params: { id: data.pid } })
      }
      console.log('save project to local')
      this.saveDataToLocal()
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
        this.membershipProjects.push(data)
        router.push({ name: 'home', params: { id: data.pid } })
      } else if (res.status === 409) {
        callbackError('You have already joined this project')
      } else {
        callbackError('Invalid passkey')
      }
      console.log('save join project to local')
      this.saveDataToLocal()
    },
    removeOwnedProject(userId, projectId) {
      // remove Project
    },
    async createNewMeeting(meetingCreationForm, callbackError) {
      const meetingData = {
        projectId: meetingCreationForm.projectId,
        topic: meetingCreationForm.topic,
        start_date: meetingCreationForm.startDate,
        end_date: meetingCreationForm.endDate,
        description: meetingCreationForm.description
      }
      const res = await Provider.request(PROJECT_ENDPOINTS.meetings, {
        method: 'POST',
        body: JSON.stringify(meetingData)
      })
      const data = res.ok ? await res.json() : null
      if (data) {
        this.ownedProjects
          .find((project) => project.id === meetingCreationForm.projectId)
          .meetings.push(data)
        this.saveDataToLocal()
      } else {
        callbackError(res.statusText)
      }
    }
  },
  getters: {
    user() {
      return this.currentUser
    },
    username() {
      return this.currentUser.username
    },
    ownedProject() {
      return this.ownedProjects.find((project) => project.id === this.currentProjectId)
    },
    membershipProject() {
      return this.membershipProjects.find((project) => project.id === this.currentProjectId)
    },
    meeting(pid) {
      const res = Provider.request(PROJECT_ENDPOINTS.meeting(pid))
      const data = res.ok ? res.json() : null
      return res.ok ? data : null
    }
  }
})

export { useUserStore }
