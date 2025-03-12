<script setup>
import mapIcon from '@/assets/map.svg'
import targetIcon from '@/assets/target.svg'
</script>

<template>
  <section
    class="relative flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 p-6 md:p-10 bg-[#E6ECA8] rounded-[20px] max-w-[1400px] mx-auto overflow-hidden"
  >
    <div class="absolute left-0 top-0 h-[50%] w-[35%] bg-[#C4D493] rounded-br-[150px]"></div>

    <div class="flex flex-col justify-between gap-6 md:gap-8 w-full md:w-1/3 h-full relative z-10">
      <div
        class="font-[Overpass_Medium] text-[#3D3E2B] leading-relaxed md:text-base pb-[80px] pr-[20px]"
      >
        <p>
          Миссия веб-приложения заключается в оказании помощи бездомным животным, предоставлении им
          необходимой медицинской помощи и создании условий для нахождения нового дома создании
          условий для нахождения нового дома.
        </p>
      </div>

      <div
        class="flex items-center gap-3 font-[Signate_Grotesk] text-lg md:text-xl text-[#3D3E2B] font-bold"
      >
        <img :src="mapIcon" alt="Карта" class="w-7 h-7" />
        Интерактивная карта
      </div>

      <router-link
        to="/map"
        class="inline-flex items-center justify-center gap-2 border border-[#3D3E2B] rounded-[12px] px-6 py-2 font-semibold hover:bg-[#D9EDC3] transition-all"
      >
        Перейти к карте
        <img :src="targetIcon" class="w-7 h-7" />
      </router-link>
    </div>

    <div
      class="w-full h-full md:w-2/3 rounded-[20px] overflow-hidden border border-[#3D3E2B] md:min-h-[340px]"
    >
      <iframe
        src="https://yandex.ru/map-widget/v1/-/CCUnX3XI"
        width="100%"
        height="350px"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  </section>
</template>
