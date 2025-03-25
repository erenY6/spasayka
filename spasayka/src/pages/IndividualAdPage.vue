<script setup>
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import female from '@/assets/allPictures/female.svg'
import iconLocation from '@/assets/map.svg'
import iconPhone from '@/assets/iconPhone.svg'
import chat from '@/assets/allPictures/chat.svg'
import checkMark from '@/assets/allPictures/checkMark.svg'
const images = ['src/assets/cat.png', 'src/assets/cat.png', 'src/assets/cat.png']
const tags = ['стерилизованна', 'приучена к лотку', 'здорова']

const carouselConfig = {
  itemsToShow: 1,
  wrapAround: true,
}
</script>

<template>
  <div class="flex flex-col w-full h-full px-12 py-6">
    <section class="flex flex-col lg:flex-row gap-10 max-w-[1400px] pb-6">
      <div class="w-2/3">
        <div
          class="relative bg-no-repeat bg-contain bg-left-top w-full min-h-[450px]"
          :style="`background-image: url('src/assets/allPictures/sticker.svg');`"
        >
          <div class="flex flex-col items-center">
            <div
              class="flex flex-row border-b border-[#273274] items-center justify-center py-5 gap-5"
            >
              <h3 class="font-[Signate_Grotesk] text-[25px]">Ириска</h3>
              <img :src="female" class="w-[30px] h-[30px]" />
              <p class="font-[Overpass_Regular] text-[20px]">2,5 года</p>
            </div>
          </div>
          <div class="flex gap-2 items-center pl-10 p-4">
            <img :src="iconLocation" alt="Иконка" class="w-[35px] h-[35px] mt-[2px]" />
            <p class="font-[Overpass_Italic] text-[18px] leading-tight">
              Санкт-Петербург, пр. Большой Смоленский, д. 9
            </p>
          </div>
          <div class="flex gap-2 items-center pl-10 pb-4">
            <img :src="iconPhone" alt="Телефон" class="w-[35px] h-[35px]" />
            <span class="font-[Overpass_Regular] text-[20px]">8 (911) 0-999-666</span>
          </div>
          <div class="flex gap-2 items-center pl-10 pb-4">
            <img :src="chat" alt="Телефон" class="w-[35px] h-[35px]" />
            <a href="#" class="text-[#273275] underline font-[Overpass_Regular] text-[16px]"
              >перейти к чату</a
            >
          </div>

          <div class="flex flex-col items-center justify-start">
            <p class="font-[Overpass_Black] text-[18px] pb-2">Основная информация о животном:</p>
            <div
              v-for="(tag, index) in tags"
              :key="index"
              class="flex gap-2 items-center justify-start pb-2"
            >
              <img :src="checkMark" class="w-[25px] h-[25px]" />
              <span class="font-[Overpass_SemiBold] text-[17px]">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="w-full flex"><img :src="images[0]" /></div> -->
      <div class="w-full">
        <Carousel v-bind="carouselConfig">
          <Slide v-for="(img, index) in images" :key="index">
            <img
              :src="img"
              alt="cat"
              class="w-[650px] h-[430px] object-cover object-center rounded-xl"
            />
          </Slide>

          <template #addons>
            <Navigation />
            <Pagination />
          </template>
        </Carousel>
      </div>
    </section>
    <div class="w-full h-full rounded-[20px] bg-[#E9DACE] items-center flex">
      <div class="space-y-4 leading-relaxed text-justify font-[Overpass_Italic] text-[18px] p-10">
        <p>
          Ириска – это удивительная кошка, которая способна наполнить ваш дом теплом и уютом. Её
          шерстка мягкая, пушистая, окрашена в нежные оттенки топлёного молока, а глаза — настоящие
          огоньки, полные любопытства и нежности. Она ласковая, мурлыкающая, обожает, когда её
          гладят, и всегда отвечает на внимание тихим урчанием. Ириска прекрасно ладит с людьми,
          легко привыкает к новому окружению и с радостью подстроится под ваш ритм жизни.
        </p>
        <p>
          Она любит играть с мячиками, ленточками и мягкими игрушками, но в то же время знает, когда
          нужно просто спокойно полежать рядом, наблюдая за вами с любовью. Эта кошка станет вам
          настоящим другом, который всегда будет рядом, будь то тихие вечера на диване или активные
          игры. Она здорова, стерилизована, приучена к лотку и полностью готова к переезду в любящую
          семью.
        </p>
        <p>
          Если вы мечтаете о пушистом друге, который подарит вам радость и уют, Ириска ждёт именно
          вас! Свяжитесь с нами, чтобы познакомиться с ней поближе и подарить ей дом, который она
          так ждёт.
        </p>
      </div>
    </div>
  </div>
</template>
