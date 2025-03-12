<script setup>
import AdvertisementCard from '@/components/AdvertisementCard.vue'
import MapBlock from '@/components/MapBlock.vue'
import ShelterCard from '@/components/ShelterCard.vue'

import content from '@/data/content.json'
import starIcon from '@/assets/star.svg'
import dogCatImage from '@/assets/dog-cat.svg'
import catPng from '@/assets/cat.png'
import shelterLogo from '@/assets/shelterLogo.png'

const pets = [
  {
    name: 'Ириска',
    gender: 'девочка',
    age: '2,5 мес.',
    info1: 'Инфа какая-то',
    info2: 'Инфа какая-то',
    image: catPng,
    description: 'Мейби описание какое-нибудь ещё. Мейби описание ещё одно длинное для примера.',
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
  <div class="max-w-[1400px] mx-auto px-6 py-10 space-y-12">
    <section
      class="flex flex-col lg:flex-row items-stretch gap-10 max-w-[1400px] mx-auto px-6 py-6"
    >
      <div class="relative flex-1 flex">
        <div
          class="relative bg-[#D9EDC3] rounded-[30px] p-8 font-[Signate_Grotesk] flex flex-col justify-center overflow-hidden w-full"
        >
          <div class="absolute right-0 top-0 h-full w-1/2 bg-[#BBD492] rounded-l-[190px]"></div>
          <h2 class="text-3xl font-bold mb-6 text-[#3D3E2B] text-center relative z-10">
            {{ content.aboutSection.title }}
          </h2>
          <div
            class="space-y-4 text-[#545547] leading-relaxed text-justify relative z-10 text-base"
          >
            <p>{{ content.aboutSection.paragraph1 }}</p>
            <p>{{ content.aboutSection.paragraph2 }}</p>
            <p>{{ content.aboutSection.paragraph3 }}</p>
          </div>
        </div>
      </div>

      <div class="flex flex-col items-center justify-center gap-4 flex-shrink-0">
        <img :src="starIcon" class="w-10 h-10 md:w-12 md:h-12" />
        <img :src="starIcon" class="w-10 h-10 md:w-12 md:h-12" />
        <img :src="starIcon" class="w-10 h-10 md:w-12 md:h-12" />
      </div>

      <div class="flex-1 flex">
        <img :src="dogCatImage" class="w-full h-full object-cover rounded-[20px]" />
      </div>
    </section>

    <section>
      <h2 class="pb-6 font-[Signate_Grotesk] text-2xl font-bold text-center">
        Они нуждаются в вашей помощи
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        <AdvertisementCard
          v-for="(pet, index) in Array(6).fill(pets[0])"
          :key="index"
          :name="pet.name"
          :gender="pet.gender"
          :age="pet.age"
          :info1="pet.info1"
          :info2="pet.info2"
          :image="pet.image"
          :description="pet.description"
        />
      </div>
    </section>
    <div class="max-w-[1400px] mx-auto px-6 py-10 space-y-12">
      <MapBlock></MapBlock>
    </div>
    <section>
      <h2 class="pb-6 font-[Signate_Grotesk] text-2xl font-bold text-center">
        Приюты, с которыми мы сотрудничаем
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 justify-items-center">
        <ShelterCard
          v-for="(shelter, index) in Array(4).fill(shelters[0])"
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
