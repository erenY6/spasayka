<!-- eslint-disable no-unused-vars -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import selectorBg1 from '@/assets/AdvertisemebtPageSvg/selectorBg1.svg'
import buttonDown from '@/assets/AdvertisemebtPageSvg/buttonDown.svg'
import selectorBgCreate from '@/assets/allPictures/selectorBgCreate.svg'
import selectorBgCreateMin from '@/assets/allPictures/selectorBgCreateMin.svg'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'false',
  },
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const selectRef = ref(null)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (option) => {
  emit('update:modelValue', option)
  isOpen.value = false
}

const handleClickOutside = (event) => {
  if (selectRef.value && !selectRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="flex flex-col" ref="selectRef">
    <div class="font-[Overpass_SemiBold] text-[17px]">{{ title }}</div>
    <div
      class="relative w-full font-[Overpass_Regular] text-[16px] leading-[16px]"
      @click="toggleDropdown"
    >
      <img
        v-if="type === 'false'"
        :src="selectorBg1"
        alt="select-bg"
        class="w-full h-auto select-bg"
      />
      <img
        v-else-if="type === 'true'"
        :src="selectorBgCreate"
        alt="select-bg"
        class="w-full h-auto select-bg"
      />
      <img
        v-else-if="type === 'min'"
        :src="selectorBgCreateMin"
        alt="select-bg"
        class="w-full h-auto select-bg"
      />

      <div class="absolute inset-0 flex items-center justify-between px-4">
        <span>
          {{ options.find((o) => o.value === modelValue)?.label || 'Выбрать' }}
        </span>
        <img
          :src="buttonDown"
          alt="arrow"
          class="w-6 h-6 transition-transform duration-200"
          :class="{ 'rotate-180': isOpen }"
        />
      </div>

      <ul
        v-if="isOpen"
        class="absolute left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-10 overflow-hidden"
      >
        <li
          v-for="(option, index) in options"
          :key="index"
          @click.stop="selectOption(option.value)"
          class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.select-bg {
  pointer-events: none;
}

.absolute {
  cursor: pointer;
}
</style>
