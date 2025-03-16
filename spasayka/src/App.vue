<script setup>
import { RouterView } from 'vue-router'
import MainHeader from '@/components/MainHeader.vue'
</script>

<template>
  <div id="app" class="text-black min-h-screen flex flex-col bg-white">
    <MainHeader />
    <main class="flex-1 flex justify-center">
      <RouterView />
    </main>
  </div>
</template>
