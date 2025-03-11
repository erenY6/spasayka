<script setup>
import { RouterView } from 'vue-router'
import MainHeader from '@/components/MainHeader.vue'
</script>

<template>
  <div id="app" class="text-black min-h-screen flex flex-col bg-gray-100">
    <MainHeader />
    <main class="pt-[40px] flex-1 flex items-center justify-center">
      <RouterView />
    </main>
  </div>
</template>
