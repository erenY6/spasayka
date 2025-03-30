<script setup>
defineProps({ dialogue: Object })
import avatar from '@/assets/allPictures/profilePicture.png'
</script>

<template>
  <div class="flex items-center gap-3 px-4 py-2 hover:bg-[#F3E6DA] cursor-pointer transition">
    <img :src="avatar" class="w-10 h-10 rounded-full object-cover" />
    <div class="flex-1">
      <div class="flex justify-between">
        <p class="font-[Overpass_Bold] text-[14px]">{{ dialogue.user1.name }}</p>
        <span class="text-xs text-gray-600">{{ dialogue.time }}</span>
      </div>
      <div class="flex justify-between items-center">
        <p class="text-sm truncate max-w-[160px] text-[#55463A]">{{ dialogue.lastMessage }}</p>
        <span
          v-if="dialogue.unread"
          class="ml-2 bg-[#B49C87] text-white text-xs px-2 py-[1px] rounded-full"
        >
          {{ dialogue.unread }}
        </span>
      </div>
    </div>
  </div>
</template>
