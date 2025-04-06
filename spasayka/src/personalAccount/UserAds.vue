<script setup>
import { computed, watch, ref } from 'vue'
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
  { immediate: true },
)

watch(
  () => adsStore.ads,
  () => {
    adsStore.loadAdsByUser(authStore.user.id)
  },
  { immediate: true },
)
const currentPage = ref(1)
const itemsPerPage = 6

const paginatedPets = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return myAds.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(myAds.value.length / itemsPerPage)
})
</script>

<template>
  <div class="w-full p-6 h-full flex flex-col bg-[#DFD2C8]">
    <div class="flex flex-row px-4 justify-between">
      <div class="font-[Signate_Grotesk] text-[20px]">Мои объявления</div>
      <router-link to="/createAd">
        <div class="flex flex-row gap-4 font-[Signate_Grotesk] text-[20px] cursor-pointer">
          Создать объявление
          <img :src="addAd" />
        </div>
      </router-link>
    </div>
    <div
      class="w-full pt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center"
    >
      <AdvertisementCard
        v-for="ad in paginatedPets"
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
    <div v-if="myAds.length > 6" class="flex justify-center pt-6 gap-2">
      <button
        v-for="page in totalPages"
        :key="page"
        @click="currentPage = page"
        :class="[
          'px-4 py-2 rounded-[5px] bg-[#D2BAA5] hover:bg-[#c4aa95] cursor-pointer',
          currentPage === page
            ? 'bg-[#CEBBAA] font-[Overpass_Bold]'
            : 'bg-[#f2e9e1] hover:bg-[#c4aa95] font-[Overpass_Medium]',
        ]"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>
