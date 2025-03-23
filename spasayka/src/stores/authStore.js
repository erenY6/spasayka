import { defineStore } from 'pinia'
import { registerUser, loginUser, fetchCurrentUser } from '@/data/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: null,
  }),

  actions: {
    async register({ email, password, name }) {
      await registerUser({ email, password, name })
    },

    async login({ email, password }) {
      const { token } = await loginUser({ email, password })
      this.token = token
      localStorage.setItem('token', token)
      await this.fetchUser()
    },

    async fetchUser() {
      try {
        this.user = await fetchCurrentUser()
      } catch (e) {
        console.error('Ошибка при получении пользователя:', e)
        this.logout()
      }
    },

    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
    },
  },
})
