<script setup>
import { useAuthStore } from '@/stores/authStore'
import { ref, watchEffect } from 'vue'

const authStore = useAuthStore()
const avatar = ref('')

watchEffect(() => {
  if (authStore.user?.avatar) {
    avatar.value = `http://localhost:3000/images/${authStore.user.avatar}`
  } else {
    avatar.value = 'https://i.pravatar.cc/100?img=5'
  }
})
</script>

<template>
  <header
    class="sticky top-0 left-0 w-full z-50 bg-white border-b border-black px-12 py-2 flex items-center text-[17px] font-[Signate_Grotesk]"
  >
    <div class="flex items-center gap-8 flex-1">
      <router-link
        to="/"
        class="flex items-center bg-[#d0d075] min-w-[115px] px-2 min-h-[40px] rounded-full"
      >
        <div class="flex px-4 gap-2">
          <img src="@/assets/logo.svg" alt="Логотип" class="h-6 mr-2" />
          СпасайКа
        </div>
      </router-link>

      <nav class="flex gap-6">
        <router-link to="/about">О нас</router-link>
        <router-link to="/ads">Объявления</router-link>
        <router-link to="/shelters">Приюты</router-link>
        <router-link to="/map">Карта</router-link>
        <router-link to="/createAds">Создать объявление</router-link>
      </nav>
    </div>

    <div v-if="authStore.user" class="flex flex-row items-center gap-4">
      <div class="flex items-center gap-2">
        <!-- <span class="text-sm">Вы вошли как:</span> -->
        <router-link to="/cabinet" class="font-semibold hover:underline">
          <span v-if="authStore.user.name && authStore.user.surname">
            {{ authStore.user.name }} {{ authStore.user.surname }}
          </span>
          <span v-else-if="authStore.user.name">
            {{ authStore.user.name }}
          </span>
        </router-link>
      </div>
      <img :src="avatar" class="w-10 h-10 rounded-full object-cover" />
    </div>

    <router-link
      v-else
      to="/auth"
      class="flex items-center justify-center bg-[#d0d075] min-w-[160px] min-h-[40px] rounded-full"
    >
      <div class="px-4">Регистрация / Вход</div>
    </router-link>
  </header>
</template>
