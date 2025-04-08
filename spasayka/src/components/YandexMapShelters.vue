<script setup>
import { onMounted, ref } from 'vue'
import { loadYandexMaps } from '@/useYandex.js'

const props = defineProps({
  shelters: Array,
})

const mapRef = ref(null)
const selectedShelter = ref(null)
let map = null
let ymapsInstance = null
let placemarks = []

const zoomToShelter = (shelter) => {
  if (map && shelter.coordinates) {
    map.setCenter(shelter.coordinates, 14, { duration: 300 })
  }
}

onMounted(async () => {
  ymapsInstance = await loadYandexMaps()

  map = new ymapsInstance.Map(mapRef.value, {
    center: [59.9311, 30.3609],
    zoom: 10,
    controls: ['zoomControl', 'geolocationControl'],
  })

  props.shelters.forEach((shelter) => {
    const placemark = new ymapsInstance.Placemark(
      shelter.coordinates,
      {
        hintContent: shelter.name,
        balloonContent: `<strong>${shelter.name}</strong><br><a href="${shelter.website}" target="_blank">Перейти на сайт</a>`,
      },
      {
        preset: 'islands#icon',
        iconColor: '#55463A',
      },
    )

    placemark.events.add('click', () => {
      selectedShelter.value = shelter
    })

    map.geoObjects.add(placemark)
    placemarks.push(placemark)
  })
})
</script>

<template>
  <div class="flex w-full h-full">
    <div
      class="flex flex-col w-[350px] bg-[#ECF0B0] rounded-l-[20px] gap-3 overflow-auto p-4 border-r border-[#6e9672]"
    >
      <div class="flex w-full bg-[#BBD492] justify-center items-center rounded-[8px]">
        <h2 class="font-[Signate_Grotesk] text-lg py-3">Приюты</h2>
      </div>
      <div class="flex w-full bg-[#b7d99e] justify-center py-3 items-center rounded-[8px]">
        <ul class="space-y-3">
          <li
            v-for="shelter in shelters"
            :key="shelter.name"
            @click="zoomToShelter(shelter)"
            class="cursor-pointer hover:text-[#8B5E3C] text-center py-2 text-[15px] font-[Overpass_Medium]"
          >
            {{ shelter.name }}
          </li>
        </ul>
      </div>
    </div>

    <div class="flex-1 w-full">
      <div ref="mapRef" class="w-full h-[600px] rounded-r-[20px] overflow-hidden"></div>
    </div>
  </div>
</template>

<style scoped>
:deep(.ymaps-2-1-79-gototech) {
  display: none;
}
</style>
