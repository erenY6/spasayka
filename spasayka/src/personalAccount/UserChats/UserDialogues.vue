<script setup>
import { onMounted, onBeforeUnmount, ref, defineEmits } from 'vue'
import IndividualDialogue from './IndividualDialogue.vue'
import { useAuthStore } from '@/stores/authStore'
import socket from '@/socket'

const emit = defineEmits(['open-dialogue'])

const dialogues = ref([])
const authStore = useAuthStore()

onMounted(() => {
  socket.connect()

  // Получить начальные диалоги (если сервер такое шлёт)
  socket.emit('getUserDialogues', { userId: authStore.user.id })

  // Пришёл список диалогов
  socket.on('dialoguesList', (data) => {
    console.log('Получены диалоги:', data)
    dialogues.value = data
  })

  // Пришло новое сообщение — можно обновить последний месседж
  socket.on('newMessage', (message) => {
    const index = dialogues.value.findIndex((d) => d.id === message.dialogueId)
    if (index !== -1) {
      dialogues.value[index].lastMessage = message.content
      dialogues.value[index].time = new Date().toLocaleTimeString()
      dialogues.value[index].unread += 1
    } else {
      // опционально: создать новый диалог
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
      @click="emit('open-dialogue', dialogue.id)"
    />
  </div>
</template>
