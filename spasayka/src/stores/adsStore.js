import { defineStore } from 'pinia'
import { fetchAds, fetchAdsByAuthor } from '@/data/api'

export const useAdsStore = defineStore('ads', {
  state: () => ({
    ads: [],
  }),

  actions: {
    async loadAds() {
      this.ads = await fetchAds()
    },

    async loadAdsByUser(userId) {
      this.ads = await fetchAdsByAuthor(userId)
    },
  },
})
