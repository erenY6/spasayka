<script setup>
import { ref, watch, onBeforeUnmount, nextTick, computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import socket from '@/socket.js'
import sendMessage from '@/assets/allPictures/sendMessage.svg'

const props = defineProps({ dialogueId: String })
const authStore = useAuthStore()

const messages = ref([])
const dialogue = ref(null)
const messageText = ref('')

const scrollToBottom = () => {
  nextTick(() => {
    const container = document.querySelector('.scroll-container')
    container?.scrollTo({ top: container.scrollHeight })
  })
}

const loadMessages = () => {
  socket.off('messagesList')
  socket.off('newMessage')

  socket.emit('getMessages', { dialogueId: props.dialogueId })

  socket.on('messagesList', (data) => {
    messages.value = data
    scrollToBottom()
  })
  scrollToBottom()
  socket.on('newMessage', (msg) => {
    if (msg.dialogueId === props.dialogueId) {
      messages.value.push(msg)
      loadMessages()
      scrollToBottom()
    }
  })
}

const fetchDialogueInfo = () => {
  socket.emit('getUserDialogues', { userId: authStore.user.id })
  socket.once('dialoguesList', (data) => {
    dialogue.value = data.find((d) => d.id === props.dialogueId) || null
  })
}

const handleSend = () => {
  if (!messageText.value.trim()) return
  socket.emit('sendMessage', {
    dialogueId: props.dialogueId,
    senderId: authStore.user.id,
    content: messageText.value,
  })
  messageText.value = ''
}

const companion = computed(() => {
  if (!dialogue.value) return null
  return dialogue.value.user1.id === authStore.user.id ? dialogue.value.user2 : dialogue.value.user1
})

const avatarUrl = computed(() => {
  if (!companion.value) return ''
  return companion.value.avatar
    ? `http://localhost:3000/images/${companion.value.avatar}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
        companion.value.name + ' ' + companion.value.surname,
      )}&background=CEBBAA&color=fff&rounded=true`
})

watch(
  () => props.dialogueId,
  (newId) => {
    if (newId) {
      loadMessages()
      fetchDialogueInfo()
      scrollToBottom()
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  socket.off('messagesList')
  socket.off('newMessage')
})
</script>

<template>
  <div class="flex flex-col h-full bg-[#CEBBAA]">
    <div class="flex items-center gap-4 border-l border-[#CEBBAA] px-6 py-2 bg-[#DFD2C8]">
      <img :src="avatarUrl" class="w-9 h-9 rounded-full object-cover" />
      <p class="font-[Overpass_Bold] text-[15px]">{{ companion.name }} {{ companion.surname }}</p>
    </div>

    <div class="flex-1 p-4 overflow-y-auto flex flex-col gap-4 scroll-container">
      <div
        v-for="msg in messages"
        :key="msg.id"
        :class="[
          'max-w-[60%] px-4 py-2 rounded-lg',
          msg.senderId === authStore.user?.id ? 'self-end bg-[#DFD2C8]' : 'self-start bg-white',
        ]"
      >
        {{ msg.content }}
      </div>
    </div>

    <div class="p-3 border-l border-[#CEBBAA] bg-[#DFD2C8]">
      <div class="flex gap-2">
        <input
          v-model="messageText"
          type="text"
          placeholder="Написать сообщение..."
          class="px-4 bg-transparent outline-none text-left flex-1"
          @keydown.enter="handleSend"
        />
        <button @click="handleSend"><img :src="sendMessage" class="w-8 h-8" /></button>
      </div>
    </div>
  </div>
</template>
