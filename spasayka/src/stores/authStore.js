import { defineStore } from 'pinia'
import { registerUser, loginUser, fetchCurrentUser, updateUserProfile } from '@/data/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: null,
    isUserLoaded: false,
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
      } finally {
        this.isUserLoaded = true
      }
    },

    setUser(user) {
      this.user = user
    },

    // Выход
    logout() {
      this.token = ''
      this.user = null
      this.isUserLoaded = true
      localStorage.removeItem('token')
    },

    async updateUserData(newData) {
      try {
        const updated = await updateUserProfile(newData)
        this.user = updated
      } catch (e) {
        console.error('Ошибка при обновлении данных пользователя:', e)
      }
    },
  },
})
