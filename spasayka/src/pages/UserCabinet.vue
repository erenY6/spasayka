<script setup>
import Sidebar from '@/components/SidebarUser.vue'
</script>

<template>
  <div class="flex h-[calc(100vh-57px)] w-full">
    <Sidebar />
    <div class="flex-1 overflow-auto">
      <router-view />
    </div>
  </div>
</template>
