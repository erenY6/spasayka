<script setup>
import { RouterView } from 'vue-router'
import MainHeader from '@/components/MainHeader.vue'
</script>

<template>
  <div id="app" class="min-h-screen w-screen flex flex-col bg-gray-100">
    <MainHeader />
    <main class="flex-1 flex items-center justify-center">
      <RouterView />
    </main>
  </div>
</template>

<style>
#app {
  min-height: 100vh;
  min-width: 100vw;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
</style>
