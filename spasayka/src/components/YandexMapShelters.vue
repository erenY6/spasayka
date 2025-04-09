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

const activePlacemark = ref(null)

const zoomToShelter = (shelter) => {
  if (map && shelter.coordinates && shelter.coordinates.length === 2) {
    map.setCenter(shelter.coordinates, 14, { duration: 300 })

    placemarks.forEach((p) => p.options.set('iconColor', '#55463A'))

    const targetPlacemark = placemarks.find(
      (p) => JSON.stringify(p.geometry.getCoordinates()) === JSON.stringify(shelter.coordinates),
    )

    if (targetPlacemark) {
      targetPlacemark.options.set('iconColor', 'red')
      activePlacemark.value = targetPlacemark
    }
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
        iconCaption: shelter.name,
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
  <div class="flex w-full items-center h-full gap-3">
    <div
      class="relative flex flex-col size-min w-[350px] bg-[#ECF0B0] rounded-[18px] gap-3 overflow-auto p-4"
    >
      <div class="absolute flex w-[318px] bg-[#AEB366] justify-center items-center rounded-[8px]">
        <h2 class="font-[Signate_Grotesk] text-lg py-3">Приюты</h2>
      </div>
      <div class="flex w-full bg-[#D4D98A] justify-center items-center rounded-[8px]">
        <ul class="space-y-3">
          <li
            v-for="shelter in shelters"
            :key="shelter.name"
            @click="zoomToShelter(shelter)"
            class="cursor-pointer hover:bg-[#ECF0B0] text-center py-3 text-[15px] font-[Overpass_SemiBold]"
          >
            {{ shelter.name }}
          </li>
        </ul>
      </div>
    </div>

    <div class="flex-1 w-full">
      <div
        ref="mapRef"
        class="w-full h-[600px] rounded-[20px] overflow-hidden border-1 border-[#ECF0B0]"
      ></div>
    </div>
  </div>
</template>

<style scoped>
:deep(.ymaps-2-1-79-gototech) {
  display: none;
}
</style>
