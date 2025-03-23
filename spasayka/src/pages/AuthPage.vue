<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import AuthBg from '@/assets/allPictures/AuthBg.png'
import close from '@/assets/allPictures/close.svg'
import emailIcon from '@/assets/iconEmail.svg'
import eyeOpen from '@/assets/allPictures/eye-open.svg'
import eyeClosed from '@/assets/allPictures/eye-closed.svg'

const password = ref('')
const showPassword = ref(false)

const passwordReg = ref('')
const showPasswordReg = ref(false)

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const togglePasswordVisibilityReg = () => {
  showPasswordReg.value = !showPasswordReg.value
}

const activeTab = ref('register')
const phoneNumber = ref('')

const formatPhoneNumber = (event) => {
  let input = event.target.value.replace(/\D/g, '')
  if (input.startsWith('7')) {
    input = input.slice(1)
  }

  let formatted = '+7 '
  if (input.length > 0) formatted += `(${input.slice(0, 3)}`
  if (input.length >= 4) formatted += `) ${input.slice(3, 6)}`
  if (input.length >= 7) formatted += `-${input.slice(6, 8)}`
  if (input.length >= 9) formatted += `-${input.slice(8, 10)}`

  phoneNumber.value = formatted
}

const authStore = useAuthStore()
const router = useRouter()

// регистрация
const nameReg = ref('')
const emailReg = ref('')
const registerError = ref('')

const handleRegister = async () => {
  registerError.value = ''

  if (!nameReg.value || !emailReg.value || !passwordReg.value) {
    registerError.value = 'Пожалуйста, заполните все поля'
    return
  }

  try {
    await authStore.register({
      email: emailReg.value,
      password: passwordReg.value,
      name: nameReg.value,
    })
    activeTab.value = 'login'
  } catch (e) {
    registerError.value = e.response?.data?.message || 'Ошибка регистрации'
  }
}

// вход
const emailLogin = ref('')
const loginError = ref('')

const handleLogin = async () => {
  loginError.value = ''

  if (!emailLogin.value || !password.value) {
    loginError.value = 'Введите почту и пароль'
    return
  }

  try {
    await authStore.login({
      email: emailLogin.value,
      password: password.value,
    })
    router.push('/')
  } catch (e) {
    loginError.value = e.response?.data?.message || 'Ошибка входа'
  }
}
</script>

<template>
  <div class="w-full h-full flex justify-end font-[Overpass_Regular]">
    <div class="absolute flex items-center w-1/2 h-full z-10">
      <div class="w-[550px] h-auto bg-white rounded-[30px] flex flex-col items-center">
        <div class="w-full flex justify-end p-4">
          <router-link to="/" class="transition-opacity duration-200 hover:opacity-70">
            <img :src="close" alt="Закрыть" class="w-[13px] h-[13px]" />
          </router-link>
        </div>

        <div class="flex w-full px-8">
          <button
            @click="activeTab = 'register'"
            :class="activeTab === 'register' ? 'bg-black text-white' : 'bg-gray-300 text-gray-600'"
            class="w-1/2 py-3 rounded-l-[30px] transition"
          >
            Регистрация
          </button>
          <button
            @click="activeTab = 'login'"
            :class="activeTab === 'login' ? 'bg-black text-white' : 'bg-gray-300 text-gray-600'"
            class="w-1/2 py-3 rounded-r-[30px] transition"
          >
            Авторизация
          </button>
        </div>

        <div
          v-if="activeTab == 'register'"
          class="w-full flex flex-col justify-center items-center"
        >
          <h2 class="text-center py-8 font-[Overpass_Medium] text-[20px]">Зарегистрироваться</h2>

          <button
            class="flex items-center justify-center border border-black rounded-full py-1 px-6 hover:bg-gray-100 transition"
          >
            <img :src="emailIcon" class="w-10 h-10 pr-2" />
            Зарегистрироваться с помощью почты
          </button>

          <div class="flex items-center w-[65%] py-4">
            <div class="border-t border-[#D9D9D9] w-full"></div>
            <span class="px-4 text-gray-500">ИЛИ</span>
            <div class="border-t border-[#D9D9D9] w-full"></div>
          </div>

          <div class="w-[65%]">
            <div class="flex gap-3 w-full pb-5">
              <input
                v-model="nameReg"
                type="text"
                placeholder="Имя"
                class="w-1/2 p-3 border rounded-[18px]"
              />
              <input
                v-model="emailReg"
                type="text"
                placeholder="Почта"
                class="w-1/2 p-3 border rounded-[18px]"
              />
            </div>

            <input
              type="tel"
              v-model="phoneNumber"
              @input="formatPhoneNumber"
              placeholder="+7 (XXX) XXX-XX-XX"
              class="w-full p-3 border rounded-[18px]"
              inputmode="tel"
              maxlength="18"
            />

            <div class="relative flex items-center justify-center w-full pb-5 py-5">
              <input
                :type="showPasswordReg ? 'text' : 'password'"
                v-model="passwordReg"
                placeholder="Пароль"
                class="w-full p-3 border rounded-[18px] pr-[40px]"
              />
              <button
                type="button"
                @click="togglePasswordVisibilityReg"
                class="absolute right-4 transition-opacity hover:opacity-70"
              >
                <img
                  :src="showPasswordReg ? eyeOpen : eyeClosed"
                  alt="Toggle visibility"
                  class="w-5 h-5"
                />
              </button>
            </div>

            <div class="pb-8 text-center">
              <button
                @click="handleRegister"
                class="w-full py-3 bg-black text-white rounded-full transition hover:opacity-80"
              >
                Зарегистрироваться
              </button>
              <p class="text-red-500 text-sm pt-7" v-if="registerError">{{ registerError }}</p>
            </div>
          </div>
        </div>
        <div v-if="activeTab == 'login'" class="w-full flex flex-col justify-center items-center">
          <h2 class="text-center py-8 font-[Overpass_Medium] text-[20px]">Войти</h2>
          <div class="flex items-center justify-center w-full pb-5">
            <input
              v-model="emailLogin"
              type="text"
              placeholder="Почта или номер телефона"
              class="w-[65%] p-3 border rounded-[18px]"
            />
          </div>
          <div class="relative flex items-center justify-center w-full pb-5">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              placeholder="Пароль"
              class="w-[65%] p-3 border rounded-[18px] pr-[40px]"
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="absolute right-28 transition-opacity hover:opacity-70"
            >
              <img
                :src="showPassword ? eyeOpen : eyeClosed"
                alt="Toggle visibility"
                class="w-5 h-5"
              />
            </button>
          </div>
          <div class="flex justify-center w-full pb-8">
            <button
              @click="handleLogin"
              class="w-[65%] py-3 bg-black text-white rounded-full transition hover:opacity-80"
            >
              Войти
            </button>
          </div>
          <p class="text-red-500 text-sm pb-7" v-if="loginError">{{ loginError }}</p>
        </div>
      </div>
    </div>
    <img :src="AuthBg" class="w-[100vw] h-[100vh] object-cover" />
  </div>
</template>
