<script setup>
import UserDialogues from './UserChats/UserDialogues.vue'
import OpenDialogue from './UserChats/OpenDialogue.vue'
import { onMounted, onBeforeUnmount, ref } from 'vue'
import socket from '@/socket'

const selectedDialogueId = ref(null)

const handleKeyDown = (event) => {
  if (event.key === 'Escape') {
    selectedDialogueId.value = null
  }
}

onMounted(() => {
  socket.connect()
  window.addEventListener('keydown', handleKeyDown)

  socket.on('newMessage', (message) => {
    console.log('Новое сообщение:', message)
  })
})

onBeforeUnmount(() => {
  socket.disconnect()
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div class="w-full h-full flex bg-[#DFD2C8]">
    <UserDialogues
      class="w-[420px]"
      :activeDialogueId="selectedDialogueId"
      @open-dialogue="selectedDialogueId = $event"
    />

    <div
      class="w-full h-full flex items-center justify-center bg-[#CEBBAA]"
      v-if="!selectedDialogueId"
    >
      <p class="text-[#55463A] text-[16px] font-[Overpass_SemiBold]">
        Выберите, кому хотели бы написать
      </p>
    </div>

    <OpenDialogue v-else class="w-full h-full" :dialogue-id="selectedDialogueId" />
  </div>
</template>
