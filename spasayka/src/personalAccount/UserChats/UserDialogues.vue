<!-- eslint-disable no-unused-vars -->
<script setup>
import { onMounted, onBeforeUnmount, ref, defineEmits } from 'vue'
import IndividualDialogue from './IndividualDialogue.vue'
import { useAuthStore } from '@/stores/authStore'
import socket from '@/socket'

const emit = defineEmits(['open-dialogue'])

const props = defineProps({
  activeDialogueId: String,
})

const dialogues = ref([])
const authStore = useAuthStore()

onMounted(() => {
  socket.connect()

  socket.emit('getUserDialogues', { userId: authStore.user.id })

  socket.on('dialoguesList', (data) => {
    dialogues.value = data.map((dialogue) => {
      const lastMsg = dialogue.messages?.[0]
      return {
        ...dialogue,
        lastMessage: lastMsg?.content || '',
        lastMessageSenderId: lastMsg?.senderId || '',
        time: lastMsg?.createdAt || '',
      }
    })
  })

  socket.on('newMessage', (message) => {
    const index = dialogues.value.findIndex((d) => d.id === message.dialogueId)
    if (index !== -1) {
      dialogues.value[index].lastMessage = message.content
      dialogues.value[index].lastMessageSenderId = message.senderId
      dialogues.value[index].time = new Date().toLocaleTimeString()
      dialogues.value[index].unread += 1
    } else {
      //
    }
  })
})

onBeforeUnmount(() => {
  socket.disconnect()
})
</script>

<template>
  <div class="h-full overflow-y-auto py-4 space-y-2">
    <IndividualDialogue
      v-for="dialogue in dialogues"
      :key="dialogue.id"
      :dialogue="dialogue"
      :activeDialogueId="props.activeDialogueId"
      @click="emit('open-dialogue', dialogue.id)"
    />
  </div>
</template>
