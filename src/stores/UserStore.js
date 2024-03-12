import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    isAuthenticated: false,
    user: Object,
    userSettings: Object
  }),
  actions: {
    loginUser({ state }, user) {
      state.user = user
    },
    logoutUser({ state }) {
      state.user = null
    }
  },
  getters: {
    getUser: (state) => state.user,
    getUserSettings: (state) => state.userSettings,
    isAuthenticated: (state) => state.isAuthenticated
  }
})
