<script setup>
import { RouterView } from 'vue-router'
import MainHeader from '@/components/MainHeader.vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

if (authStore.token) {
  authStore.fetchUser()
}
</script>

<template>
  <div id="app" class="text-black h-full flex flex-col bg-white">
    <MainHeader v-if="$route.path !== '/auth'" />
    <main class="flex-1 flex justify-center">
      <RouterView />
    </main>
  </div>
</template>
