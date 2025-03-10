<script setup>
import content from '@/data/content.json'
import starIcon from '@/assets/star.svg'
import dogCatImage from '@/assets/dog-cat.svg'
</script>

<template>
  <section
    class="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10 px-4 py-10 max-w-[1400px] mx-auto"
  >
    <div class="relative flex-1 min-w-[280px] max-w-[50%] h-auto">
      <div
        class="relative bg-[#D9EDC3] rounded-[30px] p-6 md:p-8 lg:p-10 font-[Signate_Grotesk] flex flex-col justify-center overflow-hidden h-full"
      >
        <div class="absolute right-0 top-0 h-full w-1/2 bg-[#BBD492] rounded-l-[190px]"></div>

        <h2 class="text-2xl md:text-3xl font-bold mb-6 text-[#3D3E2B] text-center relative z-10">
          {{ content.aboutSection.title }}
        </h2>
        <div
          class="space-y-4 text-[#545547] leading-relaxed text-justify relative z-10 text-sm md:text-base"
        >
          <p>{{ content.aboutSection.paragraph1 }}</p>
          <p>{{ content.aboutSection.paragraph2 }}</p>
          <p>{{ content.aboutSection.paragraph3 }}</p>
        </div>
      </div>
    </div>

    <div class="flex flex-col items-center gap-4 flex-shrink-0">
      <img :src="starIcon" class="w-10 h-10 md:w-12 md:h-12" />
      <img :src="starIcon" class="w-10 h-10 md:w-12 md:h-12" />
      <img :src="starIcon" class="w-10 h-10 md:w-12 md:h-12" />
    </div>

    <!-- Картинка -->
    <div class="flex-1 min-w-[280px] max-w-[50%] h-auto">
      <img :src="dogCatImage" class="w-full h-full object-contain rounded-[20px]" />
    </div>
  </section>
</template>
