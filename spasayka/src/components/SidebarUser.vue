<script setup>
import { useRouter } from 'vue-router'
import { ref, watchEffect } from 'vue'
import chatIcon from '@/assets/allPictures/chatIcon.svg'
import adsIcon from '@/assets/allPictures/adsIcon.svg'
import settingsIcon from '@/assets/allPictures/settingsIcon.svg'
import loginoutIcon from '@/assets/allPictures/loginoutIcon.svg'

import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const router = useRouter()

const avatar = ref('')

watchEffect(() => {
  if (authStore.user?.avatar) {
    avatar.value = `http://localhost:3000/images/${authStore.user.avatar}`
  } else {
    avatar.value = 'https://i.pravatar.cc/100?img=5'
  }
})

const handleLogout = () => {
  authStore.logout()
  router.push('/') // переход на главную
}
</script>

<template>
  <div class="w-17 bg-[#CEBBAA] flex flex-col items-center py-4 h-[calc(100vh-65px)]">
    <div class="flex flex-col items-center gap-5 flex-1">
      <img :src="avatar" class="w-10 h-10 rounded-full object-cover" />
      <router-link to="/cabinet/chats">
        <img
          :src="chatIcon"
          class="w-8 h-8 transition duration-200 hover:brightness-0 hover:invert"
          :class="{
            'brightness-0 invert': $route.path === '/cabinet/chats',
            'group-hover:brightness-0 group-hover:invert': true,
          }"
        />
      </router-link>
      <router-link to="/cabinet/my-ads">
        <img
          :src="adsIcon"
          class="w-8 h-8 transition duration-200 hover:brightness-0 hover:invert"
          :class="{
            'brightness-0 invert': $route.path === '/cabinet/my-ads',
            'group-hover:brightness-0 group-hover:invert': true,
          }"
        />
      </router-link>
      <router-link to="/cabinet/profile">
        <img
          :src="settingsIcon"
          class="w-8 h-8 transition duration-200 hover:brightness-0 hover:invert"
          :class="{
            'brightness-0 invert': $route.path === '/cabinet/profile',
            'group-hover:brightness-0 group-hover:invert': true,
          }"
        />
      </router-link>
    </div>

    <button @click="handleLogout">
      <img
        :src="loginoutIcon"
        class="w-9 h-9 cursor-pointer transition duration-200 hover:brightness-0 hover:invert"
      />
    </button>
  </div>
</template>
