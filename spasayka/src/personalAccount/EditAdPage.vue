<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { fetchAdById, updateAnimalAd } from '@/data/api'
import BasicInformation from '@/pages/createAd/BasicInformation.vue'
import AnimalStatus from '@/pages/createAd/AnimalStatus.vue'
import PersonalDataView from '@/pages/createAd/PersonalDataView.vue'
import YandexMapCreate from '@/pages/createAd/YandexMapCreate.vue'

import circle from '@/assets/allPictures/circle.svg'
import circleMark from '@/assets/allPictures/circleMark.svg'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const id = route.params.id

const basicInfoComponent = ref(null)
const mapComponent = ref(null)
const statusList = ref([])
const visibleFields = ref({ name: true, surname: false, email: true, phone: true })
const description = ref('')
const images = ref([])
const fileInput = ref(null)
const descRef = ref(null)
const errorMessage = ref('')
const showOnMap = ref(true)
const isDragging = ref(false)

onMounted(async () => {
  if (!authStore.user || !authStore.user.id) {
    router.push('/auth')
    return
  }

  const ad = await fetchAdById(id)

  if (!ad) {
    errorMessage.value = 'Объявление не найдено'
    return
  }

  basicInfoComponent.value.name = ad.name
  basicInfoComponent.value.gender = ad.gender
  basicInfoComponent.value.age = ad.age.split(' ')[1]
  basicInfoComponent.value.ageValue = ad.age.split(' ')[0]
  console.log(ad.age.split(' '))
  basicInfoComponent.value.animalType = ad.info1
  basicInfoComponent.value.height = ad.info2
  statusList.value = ad.tags.map((tag) => tag.id)
  console.log(ad.tags)
  description.value = ad.fullDesc
  if (ad.coordinates && ad.coordinates !== 'null') {
    mapComponent.value.address = ad.address
    mapComponent.value.coordinates = ad.coordinates.split(',').map(Number)
    showOnMap.value = true
  } else {
    showOnMap.value = false
  }
  ad.images.forEach((img) => {
    images.value.push({
      url: 'http://localhost:3000' + img.url,
      existingUrl: img.url,
      isExisting: true,
    })
  })
})

const handleImageUpload = (e) => {
  const files = Array.from(e.target.files)
  files.forEach((file) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      images.value.push({
        file,
        url: event.target.result,
        isExisting: false,
      })
    }
    reader.readAsDataURL(file)
  })
}

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
          isExisting: false,
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

const toggleMapVisibility = () => {
  showOnMap.value = !showOnMap.value
}

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
    formData.append('address', address)
    formData.append('coordinates', coordinates.toString())
  } else {
    formData.append('address', null)
    formData.append('coordinates', null)
  }

  formData.append('description', description.value)
  formData.append('fullDesc', description.value)
  formData.append('authorId', authStore.user.id)
  statusList.value.forEach((tag) => formData.append('tags', tag))
  const existingImages = images.value.filter((img) => img.isExisting).map((img) => img.existingUrl)

  const newImages = images.value.filter((img) => !img.isExisting)

  newImages.forEach((img) => {
    formData.append('images', img.file)
  })

  formData.append('existingImages', JSON.stringify(existingImages))

  try {
    await updateAnimalAd(id, formData)
    router.push('/cabinet/my-ads')
  } catch (e) {
    console.error(e)
    errorMessage.value = 'Ошибка при обновлении объявления'
  }
}
</script>

<template>
  <div class="w-full h-full flex flex-col bg-[#DFD2C8] px-12 py-4">
    <div class="w-full h-full">
      <h2 class="pb-6 font-[Signate_Grotesk] text-[20px]">Редактирование объявления</h2>
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

      <YandexMapCreate
        ref="mapComponent"
        v-show="showOnMap"
        :isEdit="true"
        :coordinatesEdit="ad?.coordinates"
      />

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
