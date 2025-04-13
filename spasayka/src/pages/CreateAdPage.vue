<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { uploadAnimalAd } from '@/data/api'
import BasicInformation from './createAd/BasicInformation.vue'
import AnimalStatus from './createAd/AnimalStatus.vue'
import PersonalDataView from './createAd/PersonalDataView.vue'

import circle from '@/assets/allPictures/circle.svg'
import circleMark from '@/assets/allPictures/circleMark.svg'
import YandexMapCreate from './createAd/YandexMapCreate.vue'

const router = useRouter()
const authStore = useAuthStore()
const basicInfoComponent = ref(null)
const mapComponent = ref(null)
const errorMessage = ref('')

onMounted(() => {
  if (!authStore.user || !authStore.user.id) {
    router.push('/auth')
  }
})

const statusList = ref([])

const visibleFields = ref({
  name: true,
  surname: false,
  email: true,
  phone: true,
})

const description = ref('')
const images = ref([])
const descRef = ref(null)

const fileInput = ref(null)

const handleImageUpload = (e) => {
  const files = Array.from(e.target.files)
  files.forEach((file) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      images.value.push({
        file,
        url: event.target.result,
      })
    }
    reader.readAsDataURL(file)
  })
}

const isDragging = ref(false)

const handleDrop = (e) => {
  isDragging.value = false
  const files = Array.from(e.dataTransfer.files)
  files.forEach((file) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (event) => {
        images.value.push({
          file,
          url: event.target.result,
        })
      }
      reader.readAsDataURL(file)
    }
  })
}

const autoResize = () => {
  const el = descRef.value
  if (!el) return
  el.style.height = 'auto'
  el.style.height = el.scrollHeight + 'px'
}

const removeImage = (index) => {
  images.value.splice(index, 1)
}

const showOnMap = ref(true)

const toggleMapVisibility = () => {
  showOnMap.value = !showOnMap.value
}

watch(
  [visibleFields, statusList],
  ([newVisibleFields, newStatusList]) => {
    console.log('Изменилось отображение полей:', newVisibleFields)
    console.log('Изменился список статусов:', newStatusList)
  },
  { deep: true },
)

const handleSubmit = async () => {
  const { name, gender, fullAge, animalType, height } = basicInfoComponent.value
  const { address, coordinates } = mapComponent.value

  if (!name?.trim() || !gender || !fullAge || !animalType || !height) {
    errorMessage.value = 'Пожалуйста, заполните всю информацию о животном.'
    return
  }

  if (!description.value?.trim()) {
    errorMessage.value = 'Пожалуйста, добавьте описание.'
    return
  }

  if (images.value.length === 0) {
    errorMessage.value = 'Пожалуйста, загрузите хотя бы одно изображение.'
    return
  }

  if (showOnMap.value && (!address || !coordinates || coordinates.length !== 2)) {
    errorMessage.value = 'Пожалуйста, укажите местоположение на карте.'
    return
  }

  const formData = new FormData()

  formData.append('name', name)
  formData.append('gender', gender)
  formData.append('age', fullAge)
  formData.append('info1', animalType)
  formData.append('info2', height)
  if (showOnMap.value) {
    if (!address || !coordinates || coordinates.length !== 2) {
      errorMessage.value = 'Пожалуйста, укажите местоположение на карте.'
      return
    }

    formData.append('address', address)
    formData.append('coordinates', coordinates.toString())
  } else {
    formData.append('address', null)
    formData.append('coordinates', null)
  }
  formData.append('description', description.value)
  formData.append('fullDesc', description.value)
  formData.append('authorId', authStore.user.id)
  formData.append('visibleName', visibleFields.value.name)
  formData.append('visibleSurname', visibleFields.value.surname)
  formData.append('visibleEmail', visibleFields.value.email)
  formData.append('visiblePhone', visibleFields.value.phone)
  statusList.value.forEach((tag) => formData.append('tags', tag))
  images.value.forEach((image) => {
    formData.append('images', image.file)
  })

  try {
    await uploadAnimalAd(formData)
    router.push('/cabinet/my-ads')
  } catch (e) {
    console.error(e)
    errorMessage.value = 'Ошибка при создании объявления'
  }
}
</script>
<template>
  <div class="w-full h-full flex flex-col bg-[#DFD2C8] px-12 py-4">
    <div class="w-full h-full">
      <h2 class="pb-6 font-[Signate_Grotesk] text-[20px]">Создание объявления</h2>
      <div class="w-full flex flex-row justify-between">
        <div class="w-auto h-full flex flex-col">
          <h2 class="pb-3 font-[Signate_Grotesk] text-[20px]">Основная информация о животном</h2>
          <BasicInformation ref="basicInfoComponent"></BasicInformation>
        </div>
        <div class="w-auto h-full flex flex-col">
          <h2 class="pb-3 font-[Signate_Grotesk] text-[20px]">Статус животного</h2>
          <AnimalStatus v-model="statusList" />
        </div>
        <div class="w-auto h-full flex flex-col">
          <h2 class="pb-3 font-[Signate_Grotesk] text-[20px]">
            Отображение личных данных для связи
          </h2>
          <PersonalDataView v-model:visibility="visibleFields" />
        </div>
      </div>
      <div class="w-full h-full py-6">
        <h2 class="pb-3 font-[Signate_Grotesk] text-[20px]">Описание</h2>
        <textarea
          v-model="description"
          ref="descRef"
          @input="autoResize"
          class="w-full bg-[#CEBBAA] rounded-[20px] px-6 py-5 resize-none min-h-[200px] font-[Overpass_LightItalic] text-[16px] focus:outline-none focus:ring-0"
          placeholder="Расскажите о животном..."
        ></textarea>
      </div>

      <div class="w-full py-6">
        <h2 class="pb-3 font-[Signate_Grotesk] text-[20px]">Изображения</h2>

        <input
          ref="fileInput"
          type="file"
          multiple
          accept="image/*"
          @change="handleImageUpload"
          class="hidden"
        />

        <button
          @click="fileInput?.click()"
          class="bg-[#D2BAA5] hover:bg-[#c4aa95] transition px-6 py-2 w-auto rounded-full font-[Overpass_SemiBold]"
        >
          Выбрать файлы
        </button>

        <div class="w-full h-full flex items-center pt-6">
          <div
            class="flex p-5 flex-wrap gap-4 bg-[#CEBBAA] min-h-[160px] w-full rounded-[20px]"
            @dragover.prevent="isDragging = true"
            @dragleave="isDragging = false"
            @drop.prevent="handleDrop"
            :class="isDragging ? 'ring-2 ring-[#55463A]' : ''"
          >
            <div
              v-if="images.length === 0"
              class="w-full flex items-center justify-center pointer-events-none rounded-[8px] border-2 border-dashed border-[#55463A] min-h-[100px]"
            >
              <p class="text-[#4e4136] font-[Overpass_SemiBold] text-[16px] text-center">
                Перетащите или загрузите фотографии животного
              </p>
            </div>

            <div
              v-for="(img, index) in images"
              :key="index"
              class="relative w-[120px] h-[120px] overflow-visible"
            >
              <img :src="img.url" class="rounded-[20px] object-cover w-full h-full" />
              <button
                @click="removeImage(index)"
                class="absolute top-[-8px] right-[-8px] bg-white border border-black rounded-full w-5 h-5 flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col pb-3">
        <h2 class="pb-3 font-[Signate_Grotesk] text-[20px]">Местоположение</h2>
        <div class="flex items-center gap-2 cursor-pointer py-2" @click="toggleMapVisibility">
          <img :src="showOnMap ? circleMark : circle" class="w-6 h-6" alt="toggle" />
          <span class="font-[Overpass_SemiBold] text-[15px]">Показывать на карте</span>
        </div>
      </div>

      <YandexMapCreate ref="mapComponent" v-show="showOnMap" />

      <div class="w-full flex flex-col justify-center items-center pt-6">
        <button
          @click="handleSubmit"
          class="bg-[#D2BAA5] hover:bg-[#c4aa95] transition px-6 py-2 w-auto rounded-full font-[Overpass_SemiBold]"
        >
          Сохранить объявление
        </button>
        <div v-if="errorMessage" class="text-red-600 font-[Overpass_SemiBold] text-center py-4">
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </div>
</template>
