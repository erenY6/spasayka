<script setup>
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import circle from '@/assets/allPictures/circle.svg'
import circleMark from '@/assets/allPictures/circleMark.svg'

const authStore = useAuthStore()

const props = defineProps({
  visibility: {
    type: Object,
    default: () => ({
      name: true,
      surname: true,
      email: true,
      phone: true,
    }),
  },
})

const emit = defineEmits(['update:visibility'])

const localVisibility = ref({ ...props.visibility })

const toggleField = (key) => {
  localVisibility.value[key] = !localVisibility.value[key]
  emit('update:visibility', { ...localVisibility.value })
}

watch(props.visibility, (newValue) => {
  localVisibility.value = { ...newValue }
})
</script>

<template>
  <div class="w-[384px] h-full px-8 pb-5 bg-[#CEBBAA] rounded-[20px]">
    <div class="flex flex-col w-full h-full space-y-6 py-4">
      <div
        v-for="field in [
          { key: 'name', label: 'Имя', value: authStore.user?.name },
          { key: 'surname', label: 'Фамилия', value: authStore.user?.surname },
          { key: 'email', label: 'Почта', value: authStore.user?.email },
          { key: 'phone', label: 'Телефон', value: authStore.user?.phone },
        ]"
        :key="field.key"
        class="flex flex-col space-y-1 border-b border-black pb-2"
      >
        <div class="flex items-center gap-2 cursor-pointer py-2" @click="toggleField(field.key)">
          <img :src="visibility[field.key] ? circleMark : circle" class="w-6 h-6" alt="toggle" />
          <span class="font-[Overpass_SemiBold] text-[15px]">Показывать в объявлении</span>
        </div>

        <div class="flex justify-between">
          <span class="font-[Overpass_Bold]">{{ field.label }}</span>
          <span class="text-gray-600">{{ field.value || '—' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
