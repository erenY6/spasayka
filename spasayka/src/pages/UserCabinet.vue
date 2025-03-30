<script setup>
import Sidebar from '@/components/SidebarUser.vue'
</script>

<template>
  <div class="flex h-[calc(100vh-57px)] w-full">
    <Sidebar />
    <!-- Левое боковое меню -->
    <div class="flex-1 overflow-auto">
      <router-view />
      <!-- Контент по центру -->
    </div>
  </div>
</template>
