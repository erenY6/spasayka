<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { useAdsStore } from '@/stores/adsStore'

import BaseSelect from '@/components/BaseSelect.vue'
import AdvertisementCard from '@/components/AdvertisementCard.vue'

const adsStore = useAdsStore()

const animalType = ref('Любой')
const gender = ref('Любой')
const age = ref('Любой')
const height = ref('Любая')
const condition = ref('Любое')

onMounted(async () => {
  await adsStore.loadAds()
})

const filteredPets = computed(() => {
  return adsStore.ads.filter((ad) => {
    const matchType = animalType.value === 'Любой' || ad.info1 === animalType.value
    const matchGender =
      gender.value === 'Любой' || ad.gender.toLowerCase() === gender.value.toLowerCase()
    const matchHeight = height.value === 'Любая' || ad.info2 === height.value
    const matchCondition =
      condition.value === 'Любое' ||
      (ad.tags && ad.tags.some((tag) => tag.label === condition.value))

    const numericAge = parseAge(ad.age)
    const matchAge =
      age.value === 'Любой' ||
      (numericAge !== null &&
        ((age.value === 'Щенок/Котёнок' && numericAge < 1) ||
          (age.value === 'Взрослый' && numericAge >= 1)))

    return matchType && matchGender && matchAge && matchHeight && matchCondition
  })
})

function parseAge(ageString) {
  const match = ageString.match(/^(\d+)\s*(мес\.|года|лет|год)?$/)
  if (!match) return null

  const value = parseInt(match[1])
  const unit = match[2]

  if (unit?.includes('мес')) return value / 12
  return value
}

const animalOptions = [
  { label: 'Любой', value: 'Любой' },
  { label: 'Кошка', value: 'Кошка' },
  { label: 'Собака', value: 'Собака' },
]

const genderOptions = [
  { label: 'Любой', value: 'Любой' },
  { label: 'Мальчик', value: 'Мальчик' },
  { label: 'Девочка', value: 'Девочка' },
]

const ageOptions = [
  { label: 'Любой', value: 'Любой' },
  { label: 'Щенок/Котёнок', value: 'Щенок/Котёнок' },
  { label: 'Взрослый', value: 'Взрослый' },
]

const heightOptions = [
  { label: 'Любая', value: 'Любая' },
  { label: 'Маленькая', value: 'Маленькая' },
  { label: 'Средняя', value: 'Средняя' },
  { label: 'Крупная', value: 'Крупная' },
]

const conditionOptions = [
  { label: 'Любое', value: 'Любое' },
  { label: 'Не известно', value: 'Не известно' },
  { label: 'Находится на передержке', value: 'Находится на передержке' },
  { label: 'Стерилизована/кастрирован', value: 'Стерилизована/кастрирован' },
  { label: 'Находится на улице', value: 'Находится на улице' },
  { label: 'Проходит лечение', value: 'Проходит лечение' },
  { label: 'Находится в приюте', value: 'Находится в приюте' },
  { label: 'Здоров(а)', value: 'Здоров(а)' },
  { label: 'Приучен к лотку', value: 'Приучен к лотку' },
  {
    label: 'Готов к жизни в семье с другими питомцами',
    value: 'Готов к жизни в семье с другими питомцами',
  },
]

const currentPage = ref(1)
const itemsPerPage = 9

const paginatedPets = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredPets.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredPets.value.length / itemsPerPage)
})

watch([animalType, gender, age, height, condition], () => {
  currentPage.value = 1
})
</script>

<template>
  <div class="flex flex-col w-full min-h-screen px-12 py-6">
    <h2 class="pb-6 font-[Signate_Grotesk] text-2xl">Кого вы ищите?</h2>
    <div class="flex w-full items-center space-y-4 gap-5 pb-7">
      <BaseSelect v-model="animalType" title="Вид животного" :options="animalOptions" />
      <BaseSelect v-model="gender" title="Пол" :options="genderOptions" />
      <BaseSelect v-model="age" title="Возраст" :options="ageOptions" />
      <BaseSelect v-model="height" title="Высота в холке" :options="heightOptions" />
      <BaseSelect v-model="condition" title="Состояние" :options="conditionOptions" />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
      <AdvertisementCard
        v-for="pet in paginatedPets"
        :key="pet.id"
        :id="pet.id"
        :name="pet.name"
        :gender="pet.gender"
        :age="pet.age"
        :info1="pet.info1"
        :info2="pet.info2"
        :image="pet.images?.[0] ? 'http://localhost:3000' + pet.images[0].url : ''"
        :description="pet.description"
      />
    </div>
    <div class="flex justify-center pt-6 gap-2">
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
