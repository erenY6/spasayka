<script setup>
import { ref } from 'vue'
import AuthBg from '@/assets/allPictures/AuthBg.png'
import close from '@/assets/allPictures/close.svg'

const activeTab = ref('register')
</script>

<template>
  <div class="w-full h-full flex justify-end">
    <div class="absolute flex items-center w-1/2 h-full z-10">
      <div class="w-[550px] h-[600px] bg-white rounded-[30px] flex flex-col items-end p-6">
        <router-link to="/" class="transition-opacity duration-200 hover:opacity-70">
          <img :src="close" alt="Закрыть" class="w-[15px] h-[1px]" />
        </router-link>

        <div class="flex w-full mb-6">
          <button
            @click="activeTab = 'register'"
            :class="activeTab === 'register' ? 'bg-black text-white' : 'bg-gray-300 text-gray-600'"
            class="w-1/2 py-3 rounded-l-[20px] transition"
          >
            Регистрацияы
          </button>
          <button
            @click="activeTab = 'login'"
            :class="activeTab === 'login' ? 'bg-black text-white' : 'bg-gray-300 text-gray-600'"
            class="w-1/2 py-3 rounded-r-[20px] transition"
          >
            Авторизация
          </button>
        </div>
      </div>
    </div>
    <img :src="AuthBg" class="w-[100vw] h-[100vh] object-cover" />
  </div>
</template>
