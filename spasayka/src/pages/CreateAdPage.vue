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
  <div class="w-full h-[calc(100vh-57px)] flex flex-col bg-[#DFD2C8] px-12 py-4">
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
    </div>
  </div>
</template>
