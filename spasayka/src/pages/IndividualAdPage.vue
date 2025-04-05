<script setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

import { startDialogueWithUser } from '@/data/api'
import { useAuthStore } from '@/stores/authStore'

import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import YandexMapAd from '@/components/YandexMapAd.vue'

import female from '@/assets/allPictures/female.svg'
import male from '@/assets/allPictures/male.svg'
import iconLocation from '@/assets/map.svg'
import iconPhone from '@/assets/iconPhone.svg'
import chat from '@/assets/allPictures/chat.svg'
import checkMark from '@/assets/allPictures/checkMark.svg'

const route = useRoute()
const router = useRouter()
const ad = ref(null)
const carouselConfig = {
  itemsToShow: 1,
  wrapAround: true,
}

const authStore = useAuthStore()

const openChat = async () => {
  if (!authStore.user) return

  try {
    await startDialogueWithUser(ad.value.authorId, authStore.user.id)
    router.push(`/cabinet/chats`)
  } catch (err) {
    console.error('Ошибка при открытии чата:', err)
  }
}

onMounted(async () => {
  const id = route.params.id
  const res = await axios.get(`http://localhost:3000/animal-ad/${id}`)
  ad.value = res.data
})
</script>

<template>
  <div v-if="ad" class="flex flex-col w-full min-h-[100vh] px-12 py-6">
    <section class="flex flex-col lg:flex-row gap-10 max-w-[1400px] pb-6">
      <div class="w-2/3">
        <div
          class="relative bg-no-repeat bg-contain bg-left-top w-full min-h-[450px]"
          :style="`background-image: url('/src/assets/allPictures/sticker.svg');`"
        >
          <div class="flex flex-col items-center">
            <div
              class="flex flex-row border-b border-[#273274] items-center justify-center py-5 gap-5"
            >
              <h3 class="font-[Signate_Grotesk] text-[25px]">{{ ad.name }}</h3>
              <img v-if="ad.gender === 'Девочка'" :src="female" class="w-[30px] h-[30px]" />
              <img v-else :src="male" class="w-[30px] h-[30px]" />
              <p class="font-[Overpass_Regular] text-[20px]">{{ ad.age }}</p>
            </div>
          </div>

          <div class="flex gap-2 items-center pl-10 p-4">
            <img :src="iconLocation" alt="Иконка" class="w-[35px] h-[35px]" />
            <p class="font-[Overpass_Italic] text-[18px]">
              {{ ad.address || 'Город не указан' }}
            </p>
          </div>

          <div class="flex gap-2 items-center pl-10 pb-4">
            <img :src="iconPhone" alt="Телефон" class="w-[35px] h-[35px]" />
            <span class="font-[Overpass_Regular] text-[20px]">{{
              ad.author?.phone || 'Телефон скрыт'
            }}</span>
          </div>

          <div class="flex gap-2 items-center pl-10 pb-4">
            <img :src="chat" alt="Чат" class="w-[35px] h-[35px]" />
            <a
              href="#"
              @click="openChat"
              class="text-[#273275] underline font-[Overpass_Regular] text-[16px]"
              >перейти к чату</a
            >
          </div>

          <div class="flex flex-col items-center justify-start">
            <p class="font-[Overpass_Black] text-[18px] pb-2">Основная информация о животном:</p>
            <div
              v-for="tag in ad.tags"
              :key="tag.id"
              class="flex gap-2 items-center justify-start pb-2"
            >
              <img :src="checkMark" class="w-[25px] h-[25px]" />
              <span class="font-[Overpass_SemiBold] text-[17px]">{{ tag.label }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full">
        <Carousel v-bind="carouselConfig">
          <Slide v-for="img in ad.images" :key="img.id">
            <img
              :src="`http://localhost:3000${img.url}`"
              alt="cat"
              class="w-[650px] h-[430px] object-cover object-center rounded-xl"
            />
          </Slide>

          <template #addons>
            <Navigation />
            <Pagination />
          </template>
        </Carousel>
      </div>
    </section>

    <div class="w-full h-full rounded-[20px] bg-[#E9DACE] items-center flex">
      <div class="space-y-4 leading-relaxed text-justify font-[Overpass_Italic] text-[18px] p-10">
        <p v-html="ad.fullDesc"></p>
      </div>
    </div>

    <YandexMapAd :coordinates="ad.coordinates" class="pt-8" />
  </div>
</template>
