import { defineStore } from 'pinia'
import { PROJECT_ATTRIBUTE } from '@/common/constants/project-attributes'

const useUserStore = defineStore('user', {
  state: () => ({
    user: null
  }),
  actions: {
    $reset() {
      this.user = null
    },
    /**
     *
     * @param {string} userId - user ID
     * @param {string} username - username
     */
    setUser(userId, username) {
      this.user = {
        id: userId,
        username: username
      }
    }
  },
  getters: {
    getUser() {
      return this.user
    },
  }
})

const useProjectStore = defineStore('projects', {
  state: () => ({
    ownedProject: [],
    membershipProject: []
  }),
  actions: {
    /**
     * 
     * @param {Array} projects 
     */
    initializeProjects(projects) {
      if (!(projects.length === 0)) {
        this.ownedProject = projects.filter(
          (project) => project[PROJECT_ATTRIBUTE.users.authority] === 'owner'
        )
        this.membershipProject = projects.filter(
          (project) => project[PROJECT_ATTRIBUTE.users.authority] === 'member'
        )
      }
    },
    createNewProject(userId, project) {
      // call backend create project
    },
    addContributeProject(users) {
      // adding user by username?
    },
    removeOwnedProject(userId, projectId) {
      // remove Project
    }
  }
})

export { useUserStore, useProjectStore }
