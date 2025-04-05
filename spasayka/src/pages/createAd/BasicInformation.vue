<script setup>
import { computed } from 'vue'
import BaseSelect from '@/components/BaseSelect.vue'
import selectorBgCreate from '@/assets/allPictures/selectorBgCreate.svg'
import minInputBg from '@/assets/allPictures/minInputBg.svg'

import { ref } from 'vue'

const animalType = ref('Любой')
const gender = ref('Любой')
const age = ref('Любой')
const height = ref('Любая')
const name = ref('')
const ageValue = ref('')

defineExpose({
  name,
  age: computed(() => `${ageValue.value} ${age.value}`),
  gender,
  animalType,
  height,
})

const animalOptions = [
  { label: 'Любой', value: 'Любой' },
  { label: 'Кошка', value: 'Кошка' },
  { label: 'Собака', value: 'Собака' },
  { label: 'Другой', value: 'Другой' },
]

const genderOptions = [
  { label: 'Любой', value: 'Любой' },
  { label: 'Мальчик', value: 'Мальчик' },
  { label: 'Девочка', value: 'Девочка' },
]

const ageOptions = [
  { label: 'Любой', value: 'Любой' },
  { label: 'мес.', value: 'мес.' },
  { label: 'года', value: 'года' },
  { label: 'лет', value: 'лет' },
]

const heightOptions = [
  { label: 'Любая', value: 'Любая' },
  { label: 'Маленькая', value: 'Маленькая' },
  { label: 'Средняя', value: 'Средняя' },
  { label: 'Крупная', value: 'Крупная' },
]
</script>

<template>
  <div class="w-auto h-auto flex justify-center px-8 py-5 bg-[#CEBBAA] rounded-[20px]">
    <div class="w-[320px] flex flex-col gap-3">
      <div class="w-full h-full">
        <div class="font-[Overpass_SemiBold] text-[17px]">Имя животного</div>
        <div class="relative flex items-center w-full h-[55px] font-[Overpass_regular] text-[16px]">
          <input v-model="name" class="w-[250px] absolute px-4 outline-none flex-1 z-10" />
          <img :src="selectorBgCreate" alt="select-bg" class="w-full absolute h-auto select-bg" />
        </div>
      </div>
      <div class="w-full h-full">
        <div class="font-[Overpass_SemiBold] text-[17px]">Возраст</div>
        <div class="w-full flex flex-row items-center">
          <div
            class="relative flex items-center w-full h-[55px] font-[Overpass_regular] text-[16px]"
          >
            <input v-model="ageValue" class="w-full absolute px-4 outline-none flex-1 z-10" />
            <img :src="minInputBg" alt="select-bg" class="w-hull absolute h-[55px] select-bg" />
          </div>
          <BaseSelect v-model="age" :type="'min'" :options="ageOptions" />
        </div>
      </div>
      <BaseSelect
        v-model="animalType"
        title="Вид животного"
        :type="'true'"
        :options="animalOptions"
      />
      <BaseSelect v-model="gender" title="Пол" :type="'true'" :options="genderOptions" />
      <BaseSelect v-model="height" title="Высота в холке" :type="'true'" :options="heightOptions" />
    </div>
  </div>
</template>
