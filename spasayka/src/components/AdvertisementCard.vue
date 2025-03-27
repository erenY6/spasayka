<!-- eslint-disable no-unused-vars -->
<script setup>
import '../assets/main.css'
import { ref } from 'vue'

const props = defineProps({
  id: String,
  name: String,
  gender: String,
  age: String,
  info1: String,
  info2: String,
  image: String,
  description: String,
  withShadow: {
    type: Boolean,
    default: false,
  },
})

const isFlipped = ref(false)
</script>

<template>
  <div
    @click="isFlipped = !isFlipped"
    class="relative w-[400px] h-[200px] cursor-pointer perspective"
  >
    <div
      :class="[
        'relative w-full h-full duration-700 transform-style-preserve-3d',
        isFlipped ? 'rotate-y-180' : '',
      ]"
    >
      <div
        class="absolute w-full h-full rounded-[20px] bg-[#F7E8DA] flex items-center gap-4 p-4 backface-hidden overflow-hidden"
        :class="withShadow ? 'shadow-md ' : ''"
      >
        <img :src="image" alt="Животное" class="w-[150px] h-[150px] rounded-[12px] object-cover" />
        <div
          class="absolute right-0 top-0 bg-[#D9C7B3] rounded-bl-[50px] px-3 pt-3 pb-6 min-w-[120px] text-right"
        >
          <p class="font-[Overpass_Black] leading-tight">{{ name }}</p>
          <p class="font-[Overpass_Regular] -mt-1">{{ gender }}</p>
        </div>
        <div class="flex flex-col justify-between h-full flex-1 pl-1 relative">
          <div class="text-[18px] font-semibold mt-[50px]"></div>

          <div class="flex flex-col gap-1 text-sm w-[95%]">
            <div class="font-[Overpass_Medium] text-[18px] mt-[50px]">{{ age }}</div>
            <p class="font-[Overpass_Medium] border-t border-[#AFA393] pt-1">{{ info1 }}</p>
            <p class="font-[Overpass_Medium] border-t border-[#AFA393] pt-1">{{ info2 }}</p>
          </div>
        </div>
      </div>

      <div
        class="w-full h-full rounded-[20px] bg-[#F7E8DA] p-4 flex flex-col justify-between rotate-y-180 backface-hidden relative overflow-hidden"
        :class="withShadow ? 'shadow-md ' : ''"
      >
        <div
          class="absolute right-0 top-0 w-[120px] h-[80px] bg-[#D9C7B3] rounded-bl-[50px] z-0"
        ></div>

        <div class="relative z-10 space-y-4 px-8">
          <div class="font-[Signate_Grotesk] text-[14px] leading-tight text-[#55463A] text-justify">
            {{ description }}
          </div>
        </div>

        <div class="w-full flex justify-center">
          <router-link :to="`/ad/${id}`" class="w-full flex justify-center">
            <button
              class="w-1/2 border-[2px] border-dashed border-[#5C432D] rounded-[10px] px-6 py-1 font-[Overpass_Medium] text-[16px]"
            >
              Узнать больше
            </button>
          </router-link>
        </div>
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
