<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import BasicInformation from './createAd/BasicInformation.vue'
import AnimalStatus from './createAd/AnimalStatus.vue'
import PersonalDataView from './createAd/PersonalDataView.vue'

const router = useRouter()
const authStore = useAuthStore()

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

const autoResize = () => {
  const el = descRef.value
  if (!el) return
  el.style.height = 'auto'
  el.style.height = el.scrollHeight + 'px'
}

const removeImage = (index) => {
  images.value.splice(index, 1)
}

watch(
  [visibleFields, statusList],
  ([newVisibleFields, newStatusList]) => {
    console.log('Изменилось отображение полей:', newVisibleFields)
    console.log('Изменился список статусов:', newStatusList)
  },
  { deep: true },
)
</script>
<template>
  <div class="w-full h-full flex flex-col bg-[#DFD2C8] px-12 py-4">
    <div class="w-full h-full">
      <h2 class="pb-6 font-[Signate_Grotesk] text-[20px]">Создание объявления</h2>
      <div class="w-full flex flex-row justify-between">
        <div class="w-auto h-full flex flex-col">
          <h2 class="pb-3 font-[Signate_Grotesk] text-[20px]">Основная информация о животном</h2>
          <BasicInformation></BasicInformation>
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
          <div class="flex p-5 flex-wrap gap-4 bg-[#CEBBAA] rounded-[20px]">
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
    </div>
  </div>
</template>
