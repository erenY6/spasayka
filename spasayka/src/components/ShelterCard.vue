<!-- eslint-disable no-unused-vars -->
<script setup>
import { ref } from 'vue'

const props = defineProps({
  name: String,
  address: String,
  phone: String,
  email: String,
  site: String,
  image: String,
  about: String,
  logo: String,
})

const isFlipped = ref(false)
</script>

<template>
  <div
    @click="isFlipped = !isFlipped"
    class="relative w-[360px] h-[230px] cursor-pointer perspective"
  >
    <div
      :class="[
        'relative w-full h-full duration-700 transform-style-preserve-3d',
        isFlipped ? 'rotate-y-180' : '',
      ]"
    >
      <div
        class="absolute w-full h-full rounded-[20px] bg-[#F7E8DA] flex flex-col justify-between p-4 backface-hidden overflow-hidden"
      >
        <div class="absolute right-0 top-0 w-[140px] h-[70px] bg-[#D9C7B3] rounded-bl-[50px]"></div>

        <div class="flex gap-4 items-center">
          <img :src="logo" alt="Лого приюта" class="w-[80px] h-[80px] rounded-full object-cover" />
          <div class="flex flex-col justify-center gap-1 flex-1">
            <p class="font-bold text-[16px]">{{ name }}</p>
            <p class="text-[14px]">{{ address }}</p>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2 text-[14px]">
            <span>📞</span>
            <span class="font-semibold">{{ phone }}</span>
          </div>
          <div class="flex items-center gap-2 text-[14px]">
            <span>✉️</span>
            <span>{{ email }}</span>
          </div>
          <div class="flex items-center gap-2 text-[14px]">
            <span>🔗</span>
            <span>{{ site }}</span>
          </div>
        </div>
      </div>

      <div
        class="absolute w-full h-full rounded-[20px] bg-[#F7E8DA] p-4 flex flex-col justify-between rotate-y-180 backface-hidden overflow-hidden"
      >
        <div class="absolute right-0 top-0 w-[140px] h-[70px] bg-[#D9C7B3] rounded-bl-[50px]"></div>

        <div class="text-[14px] leading-tight font-semibold text-[#333] overflow-auto">
          <p>{{ about }}</p>
        </div>

        <img :src="image" alt="Фото приюта" class="w-[80px] h-[80px] object-contain self-end" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.perspective {
  perspective: 1200px;
}

.transform-style-preserve-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}
</style>
