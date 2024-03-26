/* eslint-disable no-unused-vars */
import { defineStore } from 'pinia'
import Provider from '@/api/provider'
import { getCookie } from '@/common/utils/cookie-util'
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
    async initializeMeetings(authority) {
      const res = await Provider.request(PROJECT_ENDPOINTS.meeting(this.currentProjectId))
      if (res.ok) {
        const data = (await res.json()) ?? []
        if (authority === AUTHORITY_VALUE.OWNER) {
          this.ownedProjects.find((project) => project.id === this.currentProjectId).meetings = data
        } else {
          this.membershipProjects.find((project) => project.id === this.currentProjectId).meetings =
            data
        }
        this.saveDataToLocal()
      }
    },
    setCurrentUser(user) {
      this.currentUser = user
    },
    initializeStore(user, projects) {
      this.setCurrentUser(user)
      this.initializeProjects(projects)
      this.saveDataToLocal()
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
    async loginBySession() {
      const res = await Provider.request(ACCOUNT_ENDPOINTS.data, {
        headers: {
          Cookie: getCookie('bit_tkn')
        }
      })
      const data = res.ok ? await res.json() : null
      if (res.ok && data) {
        const { id, username, projects } = data
        this.initializeStore({ id, username }, projects)
      }
    },
    async logout() {
      const res = await Provider.request(ACCOUNT_ENDPOINTS.logout)
      if (!res.ok) {
        console.log('Failed to logout')
        return
      }
      this.clearDataFromLocal()
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
        this.saveDataToLocal()
        return data
      }
    },
    async joinProject(projectJoinForm, callbackError) {
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
      if (res.ok) {
        this.membershipProjects.push(data)
        this.saveDataToLocal()
        return data
      } else if (res.status === 409) {
        callbackError('You have already joined this project')
      } else {
        callbackError('Invalid passkey')
      }
    },
    async updateProjectInfo(projectId, projectData) {
      const res = await Provider.request(PROJECT_ENDPOINTS.project_mutate(projectId), {
        method: 'PATCH',
        body: JSON.stringify(projectData)
      })
      if (res.ok) {
        const project = this.ownedProjects.find((project) => project.id === projectId)
        Object.assign(project, projectData)
        this.saveDataToLocal()
      }
    },
    async removeOwnedProject(projectId) {
      const res = await Provider.request(PROJECT_ENDPOINTS.project_mutate(projectId), {
        method: 'DELETE'
      })
      if (res.ok) {
        this.ownedProjects = this.ownedProjects.filter((project) => project.id !== projectId)
        
        this.saveDataToLocal()
      }
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
        return data
      } else {
        callbackError(res.statusText)
      }
    },
    async updateMeetingInfo(meetingId, meetingData) {
      const res = await Provider.request(PROJECT_ENDPOINTS.meeting_mutate(meetingData), {
        method: 'PATCH',
        body: JSON.stringify(meetingData)
      })
      if (res.ok) {
        const project = this.ownedProjects.find((project) => project.id === this.currentProjectId)
        const meeting = project.meetings.find((meeting) => meeting.id === meetingId)
        Object.assign(meeting, meetingData)
        this.saveDataToLocal()
      }
    },
    async removeMeeting(projectId, meetingId) {
      const res = await Provider.request(PROJECT_ENDPOINTS.meeting_mutate(meetingId), {
        method: 'DELETE'
      })
      if (res.ok) {
        const project = this.ownedProjects.find((project) => project.id === projectId)
        project.meetings = project.meetings.filter((meeting) => meeting.id !== meetingId)
        this.saveDataToLocal()
      }
    },

    async createNewFeedback(feedbackData) {
      const res = await Provider.request(PROJECT_ENDPOINTS.meeting_mutate(feedbackData.meetingId), {
        method: 'POST',
        body: JSON.stringify({
          userId: this.currentUser.id,
          meetingId: feedbackData.meetingId,
          group: feedbackData.title,
          text: feedbackData.content
        })
      })
      if (res.ok) {
        const project = this.ownedProjects.find((project) => project.id === this.currentProjectId)
        const meeting = project.meetings.find((meeting) => meeting.id === feedbackData.meetingId)
        meeting.feedbackRecords[feedbackData.group].push({
          username: this.currentUser.username,
          content: feedbackData.content
        })
        this.saveDataToLocal()
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
    authority() {
      const allProjects = this.ownedProjects.concat(this.membershipProjects)
      const project = allProjects.find((project) => project.id === this.currentProjectId)
      return project.authority
    },
    meeting() {
      const allProjects = this.ownedProjects.concat(this.membershipProjects)
      const project = allProjects.find((project) => project.id === this.currentProjectId)
      return project.meetings.find((meeting) => meeting.id === this.currentMeetingId)
    }
  }
})

export { useUserStore }
