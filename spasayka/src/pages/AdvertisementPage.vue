<script setup>
import { onMounted, ref, watch } from 'vue'
import { useAdsStore } from '@/stores/adsStore'

import BaseSelect from '@/components/BaseSelect.vue'
import AdvertisementCard from '@/components/AdvertisementCard.vue'

const animalType = ref('Любой')
const gender = ref('Любой')
const age = ref('Любой')
const height = ref('Любая')
const condition = ref('Любое')

const adsStore = useAdsStore()

onMounted(async () => {
  await adsStore.loadAds()
})

const pets = ref([adsStore.ads])

watch(adsStore, (newvalue) => {
  pets.value = newvalue.ads
})

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
  { label: 'Щенок/Котёнок', value: 'Маленький' },
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
  { label: 'Здоров', value: 'Здоров' },
  { label: 'Нуждается в лечении', value: 'Болен' },
]
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
        v-for="pet in pets"
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
  </div>
</template>
