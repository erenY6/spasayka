<!-- eslint-disable no-unused-vars -->
<script setup>
import { onMounted, onBeforeUnmount, ref, defineEmits, watch } from 'vue'
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
  if (!socket.connected) {
    socket.io.opts.query = { userId: authStore.user.id }
    socket.connect()
  }

  socket.emit('getUserDialogues', { userId: authStore.user.id })

  socket.on('dialoguesList', (data) => {
    dialogues.value = data.map((dialogue) => {
      const lastMsg = dialogue.messages?.[dialogue.messages.length - 1]
      return {
        ...dialogue,
        lastMessage: lastMsg?.content || '',
        lastMessageSenderId: lastMsg?.senderId || '',
        time: lastMsg?.createdAt || '',
        isRead: lastMsg?.isRead || false,
      }
    })
  })

  socket.on('newMessage', (message) => {
    const index = dialogues.value.findIndex((d) => d.id === message.dialogueId)
    if (index !== -1) {
      dialogues.value[index].lastMessage = message.content
      console.log(dialogues.value[index].lastMessage)
      dialogues.value[index].lastMessageSenderId = message.senderId
      dialogues.value[index].time = new Date().toLocaleTimeString()
    }
  })
  socket.on('messageRead', ({ dialogueId }) => {
    socket.emit('getUserDialogues', { userId: authStore.user.id })
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
