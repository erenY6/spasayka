<script setup>
import { ref, watchEffect } from 'vue'
import { updateUserProfile } from '@/data/api'
import { useAuthStore } from '@/stores/authStore'
import edit from '@/assets/allPictures/edit.svg'

const authStore = useAuthStore()

const name = ref('')
const surname = ref('')
const email = ref('')
const phone = ref('')
const avatar = ref('')
const avatarFile = ref(null)
const errorMessage = ref('') // для отображения ошибок

// Подгружаем данные из authStore
watchEffect(() => {
  name.value = authStore.user?.name || ''
  surname.value = authStore.user?.surname || ''
  email.value = authStore.user?.email || ''
  phone.value = authStore.user?.phone || ''
  avatar.value = authStore.user?.avatar
    ? `http://localhost:3000/images/${authStore.user.avatar}`
    : ''
})

// Обработка загрузки аватара
const handleAvatarUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    avatarFile.value = file
    const reader = new FileReader()
    reader.onload = (e) => {
      avatar.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

// Маска для телефона
const formatPhoneNumber = (event) => {
  let input = event.target.value.replace(/\D/g, '')
  if (input.startsWith('7')) input = input.slice(1)

  let formatted = '+7 '
  if (input.length > 0) formatted += `(${input.slice(0, 3)}`
  if (input.length >= 4) formatted += `) ${input.slice(3, 6)}`
  if (input.length >= 7) formatted += `-${input.slice(6, 8)}`
  if (input.length >= 9) formatted += `-${input.slice(8, 10)}`

  phone.value = formatted
  event.target.value = formatted
}

// Сохранение профиля
const saveProfile = async () => {
  errorMessage.value = ''
  const rawPhone = phone.value.replace(/\D/g, '')

  if (!name.value || !surname.value || !email.value || rawPhone.length !== 11) {
    errorMessage.value = 'Пожалуйста, заполните все поля корректно'
    return
  }

  const formData = new FormData()
  formData.append('name', name.value)
  formData.append('surname', surname.value)
  formData.append('email', email.value)
  formData.append('phone', phone.value)
  if (avatarFile.value) {
    formData.append('avatar', avatarFile.value)
  }

  try {
    const updatedUser = await updateUserProfile(formData)
    authStore.setUser(updatedUser)
  } catch (error) {
    console.error('Ошибка при обновлении:', error)
    errorMessage.value = 'Не удалось обновить данные'
  }
}
</script>

<template>
  <div class="w-full h-full flex flex-col items-center p-6 bg-[#DFD2C8]">
    <div class="font-[Signate_Grotesk] text-[20px] pb-10">Настройки</div>

    <div class="bg-[#E1D1C3] rounded-[20px] w-[500px] overflow-hidden shadow-md">
      <!-- Аватар и имя -->
      <div class="bg-[#CEBBAA] flex flex-row items-center p-4">
        <div class="relative">
          <img
            :src="avatar"
            alt="Аватар"
            class="w-[80px] h-[80px] rounded-full object-cover border border-black"
          />
          <label
            class="absolute bottom-1 right-1 bg-white rounded-full w-5 h-5 flex items-center justify-center cursor-pointer"
          >
            <img :src="edit" class="w-3 h-3" />
            <input type="file" accept="image/*" class="hidden" @change="handleAvatarUpload" />
          </label>
        </div>
        <div class="px-4 flex flex-col">
          <p class="font-[Overpass_Bold] text-[16px] mt-3 pb-[3px]">{{ surname }} {{ name }}</p>
          <p class="font-[Overpass_Medium] text-[14px] text-gray-700">{{ email }}</p>
        </div>
      </div>

      <!-- Поля ввода -->
      <div class="px-6 py-6 space-y-5 text-[15px] font-[Overpass_Regular]">
        <div class="flex justify-between items-center border-b border-black py-2">
          <label class="font-[Overpass_Bold] w-[100px]">Имя</label>
          <input type="text" v-model="name" class="bg-transparent outline-none text-right flex-1" />
        </div>
        <div class="flex justify-between items-center border-b border-black py-2">
          <label class="font-[Overpass_Bold] w-[100px]">Фамилия</label>
          <input
            type="text"
            v-model="surname"
            class="bg-transparent outline-none text-right flex-1"
          />
        </div>
        <div class="flex justify-between items-center border-b border-black py-2">
          <label class="font-[Overpass_Bold] w-[100px]">Почта</label>
          <input
            type="email"
            v-model="email"
            class="bg-transparent outline-none text-right flex-1"
          />
        </div>
        <div class="flex justify-between items-center border-b border-black py-2">
          <label class="font-[Overpass_Bold] w-[100px]">Телефон</label>
          <input
            type="tel"
            v-model="phone"
            @input="formatPhoneNumber"
            class="bg-transparent outline-none text-right flex-1"
          />
        </div>
      </div>

      <div class="w-full flex justify-center pb-6">
        <button
          @click="saveProfile"
          class="bg-[#D2BAA5] hover:bg-[#c4aa95] transition px-6 py-2 rounded-full font-[Overpass_SemiBold]"
        >
          Сохранить
        </button>
        <p v-if="errorMessage" class="text-red-600 text-sm text-center pb-3">
          {{ errorMessage }}
        </p>
      </div>
    </div>
  </div>
</template>
