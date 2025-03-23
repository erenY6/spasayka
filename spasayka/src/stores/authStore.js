import { defineStore } from 'pinia'
import { registerUser, loginUser, fetchCurrentUser } from '@/data/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: null,
  }),

  actions: {
    // Регистрация
    async register({ name, surname, email, phone, password }) {
      await registerUser({ name, surname, email, phone, password })
    },

    // Авторизация
    async login({ emailOrPhone, password }) {
      const { token } = await loginUser({ emailOrPhone, password })
      this.token = token
      localStorage.setItem('token', token)
      await this.fetchUser()
    },

    // Получение текущего пользователя
    async fetchUser() {
      try {
        this.user = await fetchCurrentUser()
      } catch (e) {
        console.error('Ошибка при получении пользователя:', e)
        this.logout()
      }
    },

    // Выход
    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
    },
  },
})
