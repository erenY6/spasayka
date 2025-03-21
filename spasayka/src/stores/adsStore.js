import { defineStore } from 'pinia'
import { fetchAds } from '@/data/api'

export const useAdsStore = defineStore('ads', {
  state: () => ({
    ads: [],
  }),
  actions: {
    async loadAds() {
      this.ads = await fetchAds()
    },
  },
})
