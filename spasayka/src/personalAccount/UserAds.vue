<script setup>
import { computed, watch } from 'vue'
import { useAdsStore } from '@/stores/adsStore'
import { useAuthStore } from '@/stores/authStore'
import AdvertisementCard from '@/components/AdvertisementCard.vue'
import addAd from '@/assets/allPictures/addAd.svg'

const adsStore = useAdsStore()
const authStore = useAuthStore()

const myAds = computed(() => adsStore.ads)

watch(
  () => authStore.user,
  (user) => {
    if (user) {
      adsStore.loadAdsByUser(user.id)
      console.log(adsStore.loadAdsByUser(user.id))
    }
  },
  { immediate: true }, // запуск сразу если user уже есть
)
</script>

<template>
  <div class="w-full p-6 h-full flex flex-col bg-[#DFD2C8]">
    <div class="flex flex-row px-4 justify-between">
      <div class="font-[Signate_Grotesk] text-[20px]">Мои объявления</div>
      <div class="flex flex-row gap-4 font-[Signate_Grotesk] text-[20px]">
        Создать объявление
        <img :src="addAd" />
      </div>
    </div>
    <div
      class="w-full h-full pt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center"
    >
      <AdvertisementCard
        v-for="ad in myAds"
        :key="ad.id"
        :id="ad.id"
        :name="ad.name"
        :gender="ad.gender"
        :age="ad.age"
        :info1="ad.info1"
        :info2="ad.info2"
        :description="ad.description"
        :image="ad.images?.[0] ? 'http://localhost:3000' + ad.images[0].url : ''"
        :withShadow="true"
      />
    </div>
  </div>
</template>
