<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const props = defineProps({ dialogue: Object, activeDialogueId: String })
const authStore = useAuthStore()

const companion = computed(() => {
  return props.dialogue.user1.id === authStore.user?.id
    ? props.dialogue.user2
    : props.dialogue.user1
})

const avatar = computed(() =>
  companion.value.avatar
    ? `http://localhost:3000/images/${companion.value.avatar}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
        companion.value.name + ' ' + companion.value.surname,
      )}&background=CEBBAA&color=fff&rounded=true`,
)

function formatTime(dateStr) {
  const date = new Date(dateStr)
  const now = new Date()
  const isToday = date.toDateString() === now.toDateString()
  const daysAgo = (now - date) / (1000 * 60 * 60 * 24)

  if (isToday) {
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
  } else if (daysAgo < 7) {
    return date.toLocaleDateString('ru-RU', { weekday: 'short' })
  } else {
    return date.toLocaleDateString('ru-RU')
  }
}

const previewMessage = computed(() => {
  if (!props.dialogue.lastMessage || !authStore.user) return ''
  const senderIsMe = props.dialogue.lastMessageSenderId === authStore.user.id
  const prefix = senderIsMe ? 'Вы: ' : `${companion.value.name}: `
  return prefix + props.dialogue.lastMessage
})
const isActive = computed(() => props.dialogue.id === props.activeDialogueId)
</script>

<template>
  <div
    class="flex items-center gap-3 px-4 py-2 hover:bg-[#F3E6DA] cursor-pointer transition h-[60px]"
    :class="isActive ? 'bg-[#F3E6DA]' : 'hover:bg-[#F3E6DA]'"
  >
    <img :src="avatar" class="w-10 h-10 rounded-full object-cover" />
    <div class="flex-1 overflow-hidden">
      <div class="flex justify-between items-center">
        <p
          class="font-[Overpass_Bold] text-[14px] truncate max-w-[160px]"
          :title="`${companion.name} ${companion.surname}`"
        >
          {{ companion.name }} {{ companion.surname }}
        </p>
        <span class="text-xs text-gray-600 whitespace-nowrap">
          {{ formatTime(dialogue.updatedAt) }}
        </span>
      </div>
      <div class="flex justify-between items-center">
        <p class="text-sm truncate text-[#55463A] max-w-[160px]">
          {{ previewMessage }}
        </p>
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
