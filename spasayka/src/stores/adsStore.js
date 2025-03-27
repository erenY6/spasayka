import { defineStore } from 'pinia'
import { fetchAds, fetchAdsByAuthor } from '@/data/api'

export const useAdsStore = defineStore('ads', {
  state: () => ({
    ads: [],
  }),

  actions: {
    // Загружает все объявления
    async loadAds() {
      this.ads = await fetchAds()
    },

    // Загружает объявления только текущего пользователя
    async loadAdsByUser(userId) {
      this.ads = await fetchAdsByAuthor(userId)
    },
  },
})
