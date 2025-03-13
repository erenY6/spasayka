<script setup>
import sticker1 from '@/assets/aboutPage/sticker1.svg'
import sticker2 from '@/assets/aboutPage/sticker2.svg'
import brownBg from '@/assets/aboutPage/brownBg.svg'
import greenBg from '@/assets/aboutPage/greenBg.svg'
import brownBg2 from '@/assets/aboutPage/brownBg2.svg'
import greenBg2 from '@/assets/aboutPage/greenBg2.svg'

const items = [
  {
    text: 'Спасение – Лечение и реабилитация животных, попавших в беду.',
    text2: 'Взять животное домой',
    bg: brownBg,
    bg2: brownBg2,
  },
  {
    text: 'Поиск дома – Помогаем найти любящих хозяев.',
    text2: 'Стать волонтером',
    bg: greenBg,
    bg2: greenBg2,
  },
  {
    text: 'Сотрудничество – Работаем с приютами, волонтерами и ветеринарами.',
    text2: 'Передача помощи приютам',
    bg: brownBg,
    bg2: brownBg2,
  },
  {
    text: 'Образование – Рассказываем о гуманном отношении к животным.',
    text2: 'Передержка животных',
    bg: greenBg,
    bg2: greenBg2,
  },
]
</script>

<template>
  <div class="w-full mx-auto px-12 py-6">
    <div class="flex flex-col lg:flex-row items-start justify-between gap-10">
      <div class="flex flex-col gap-7 w-full lg:w-1/2">
        <h2 class="font-[Signate_Grotesk] text-[#3D3E2B] text-3xl text-center">
          Наша миссия и цели
        </h2>

        <div
          v-for="(item, index) in items"
          :key="index"
          class="relative w-full flex items-center justify-center font-[Overpass_Black] text-[17px] text-[#333] min-h-[60px]"
        >
          <img :src="item.bg" preserveAspectRatio="none" class="absolute inset-0 w-full" />

          <span class="relative pt-4 z-10 text-center px-17 leading-snug">
            {{ item.text }}
          </span>
        </div>
      </div>

      <div class="w-full lg:w-1/2 flex justify-center items-start">
        <img :src="sticker1" alt="Стикер" class="w-full h-auto max-w-[600px]" />
      </div>
    </div>

    <div class="flex flex-col pt-6 lg:flex-row items-start justify-between gap-10">
      <div class="w-full lg:w-1/2 flex justify-center items-start">
        <img :src="sticker2" alt="Стикер" class="w-full h-auto max-w-[600px]" />
      </div>
      <div class="flex flex-col gap-7 w-full lg:w-1/2">
        <h2 class="font-[Signate_Grotesk] text-[#3D3E2B] text-3xl text-center">Как нам помочь?</h2>

        <div
          v-for="(item, index) in items"
          :key="index"
          class="hover:scale-[1.02] active:scale-95 cursor-pointer relative w-full flex items-center justify-center font-[Overpass_Black] text-[17px] text-[#333] min-h-[60px]"
        >
          <img :src="item.bg2" preserveAspectRatio="none" class="absolute inset-0 w-full" />

          <span class="relative pt-4 z-10 text-center px-17 leading-snug">
            {{ item.text2 }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
