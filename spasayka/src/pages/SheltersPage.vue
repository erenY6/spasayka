<script setup>
import contentShelter from '@/data/content.json'
import brownBg2 from '@/assets/aboutPage/brownBg2.png'
import greenBg2 from '@/assets/aboutPage/greenBg2.png'
import shelterLogo from '@/assets/shelterLogo.png'
import ShelterCard from '@/components/ShelterCard.vue'

const items = [
  {
    text: 'Передать корм и медикаменты',
    bg: brownBg2,
  },
  {
    text: 'Стать куратором животного',
    bg: greenBg2,
  },
  {
    text: 'Финансовая помощь',
    bg: brownBg2,
  },
  {
    text: 'Поддержать приют юридически или технически',
    bg: greenBg2,
  },
]

const shelters = [
  {
    name: 'Фонд "Помощь бездомным собакам"',
    address: 'Санкт-Петербург, проспект Большой Смоленский, д. 9',
    phone: '8 (911) 0-999-666',
    email: 'info@priut.ru',
    website: 'https://priut.ru/',
    logo: shelterLogo,
    about:
      'История спасения бездомных животных Кирой Никитиной и Татьяной Шеиной началась в 2001 году, когда в Санкт-Петербурге был зарегистрирован Благотворительный Фонд «Помощь бездомным собакам».',
  },
]
</script>

<template>
  <div class="flex flex-col w-full px-12 py-6">
    <section class="flex flex-col lg:flex-row gap-10 max-w-[1400px] mx-auto pb-6">
      <div class="flex flex-col items-center w-full lg:w-1/2">
        <h2 class="font-[Signate_Grotesk] text-[#3D3E2B] text-3xl text-center pb-4">
          Как помочь приютам?
        </h2>

        <div class="flex flex-col gap-4 w-full">
          <div
            v-for="(item, index) in items"
            :key="index"
            class="relative w-full flex items-center justify-center font-[Overpass_Black] text-[17px] text-[#333] h-[80px]"
          >
            <img
              :src="item.bg"
              preserveAspectRatio="none"
              class="absolute justify-center items-center inset-0 h-full w-full"
            />

            <span class="relative z-10 text-center px-17 leading-snug">
              {{ item.text }}
            </span>
          </div>
        </div>
      </div>

      <div class="relative flex-1 flex pt-6">
        <div
          class="relative bg-[#ECF0B0] rounded-[30px] p-8 font-[Signate_Grotesk] flex flex-col justify-center overflow-hidden w-full"
        >
          <div class="absolute left-0 top-0 h-full w-1/2 bg-[#BBD492] rounded-r-[190px]"></div>
          <h2 class="text-[27px] pb-4 text-[#3D3E2B] text-center relative z-10">
            {{ contentShelter.aboutShelter.title }}
          </h2>
          <div class="text-[#545547] text-justify relative z-10">
            <p class="font-[Overpass_Black] text-[18px] pb-2">
              {{ contentShelter.aboutShelter.paragraph1 }}
            </p>
            <p class="font-[Overpass_Italic] text-[17px]">
              {{ contentShelter.aboutShelter.paragraph2 }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 class="pb-6 font-[Signate_Grotesk] text-2xl font-bold text-center">
        Приюты в городе Санкт-Петербург
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 justify-items-center">
        <ShelterCard
          v-for="(shelter, index) in Array(8).fill(shelters[0])"
          :key="index"
          :name="shelter.name"
          :address="shelter.address"
          :phone="shelter.phone"
          :email="shelter.email"
          :website="shelter.website"
          :logo="shelter.logo"
          :about="shelter.about"
        />
      </div>
    </section>
  </div>
</template>
