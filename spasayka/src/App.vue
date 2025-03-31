<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import MainHeader from '@/components/MainHeader.vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

onMounted(async () => {
  if (authStore.token) {
    await authStore.fetchUser()
  } else {
    authStore.isUserLoaded = true
  }
})
</script>

<template>
  <div v-if="authStore.isUserLoaded" id="app" class="text-black h-full flex flex-col bg-white">
    <MainHeader v-if="$route.path !== '/auth'" />
    <main class="flex-1 flex justify-center">
      <RouterView />
    </main>
  </div>
  <div v-else class="flex justify-center items-center h-screen text-lg">Загрузка...</div>
</template>
