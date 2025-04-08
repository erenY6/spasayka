<!-- eslint-disable no-unused-vars -->
<script setup>
import { ref } from 'vue'

import imageDog from '@/assets/imageDog.svg'
import iconPhone from '@/assets/iconPhone.svg'
import iconEmail from '@/assets/iconEmail.svg'
import iconSite from '@/assets/iconSite.svg'
import iconLocation from '@/assets/map.svg'

const props = defineProps({
  name: String,
  address: String,
  phone: String,
  email: String,
  website: String,
  about: String,
  logo: String,
})

const isFlipped = ref(false)
</script>

<template>
  <div
    @click="isFlipped = !isFlipped"
    class="relative w-[600px] h-[240px] cursor-pointer perspective"
  >
    <div
      :class="[
        'relative w-full h-full duration-700 transform-style-preserve-3d',
        isFlipped ? 'rotate-y-180' : '',
      ]"
    >
      <div
        class="absolute w-full h-full rounded-[20px] bg-[#F7E8DA] items-center flex flex-row gap-6 p-5 backface-hidden overflow-hidden"
      >
        <div
          class="absolute left-0 top-0 w-[140px] h-[50%] bg-[#D9C7B3] rounded-br-[50px] z-0"
        ></div>

        <img :src="logo" class="w-[100px] h-[100px] rounded-full object-cover z-10 bg-white" />

        <div class="flex flex-col gap-2 relative z-10">
          <div class="flex flex-col justify-center gap-1 flex-1">
            <p class="font-[Overpass_Black] text-[20px] text-center leading-tight pb-[15px]">
              {{ name }}
            </p>
            <div class="flex gap-2 items-start">
              <img :src="iconLocation" alt="Иконка" class="w-[30px] h-[30px] mt-[2px]" />
              <p class="font-[Overpass_Medium] text-[16px] leading-tight">{{ address }}</p>
            </div>
          </div>
          <div class="flex items-center gap-2 font-[Overpass_Medium] text-[16px]">
            <img :src="iconPhone" alt="Телефон" class="w-[30px] h-[30px]" />
            <span>{{ phone }}</span>
          </div>
          <div class="flex items-center gap-2 font-[Overpass_Medium] text-[16px]">
            <img :src="iconEmail" alt="Почта" class="w-[30px] h-[30px]" />
            <span>{{ email }}</span>
          </div>
          <div class="flex items-center gap-2 font-[Overpass_Medium] text-[16px]">
            <img :src="iconSite" alt="Сайт" class="w-[30px] h-[30px]" />
            <a
              :href="website"
              target="_blank"
              rel="noopener noreferrer"
              class="text-[#55463A] hover:underline break-all"
            >
              {{ website }}
            </a>
          </div>
        </div>
      </div>

      <div
        class="grid-cols-[70%_30%] grid-rows-1 justify-items-center items-center gap-4 w-full h-full rounded-[20px] bg-[#F7E8DA] p-5 flex rotate-y-180 backface-hidden overflow-hidden"
      >
        <div class="relative z-10">
          <p class="font-[Overpass_Black] text-[20px] text-center mb-2">О фонде</p>
          <p
            class="font-[Overpass_Medium] text-justify text-[17px] leading-tight font-medium text-[#333] line-clamp-7"
          >
            {{ about }}
          </p>
        </div>

        <img
          :src="imageDog"
          alt="Иллюстрация"
          class="flex w-[90px] h-[90px] object-contain relative z-10"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.perspective {
  perspective: 1200px;
}

.transform-style-preserve-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}
</style>
