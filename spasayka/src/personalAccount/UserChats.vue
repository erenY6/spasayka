<script setup>
import UserDialogues from './UserChats/UserDialogues.vue'
import OpenDialogue from './UserChats/OpenDialogue.vue'
import { onMounted, onBeforeUnmount, ref } from 'vue'
import socket from '@/socket'

const selectedDialogueId = ref(null)

onMounted(() => {
  socket.connect()

  socket.on('newMessage', (message) => {
    console.log('Новое сообщение:', message)
  })
})

onBeforeUnmount(() => {
  socket.disconnect()
})
</script>

<template>
  <div class="w-full h-full flex bg-[#DFD2C8]">
    <UserDialogues class="w-[420px]" @open-dialogue="selectedDialogueId = $event" />
    <OpenDialogue class="w-full h-full" :dialogue-id="selectedDialogueId" />
  </div>
</template>
