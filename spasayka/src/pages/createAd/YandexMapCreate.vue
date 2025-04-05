<script setup>
import { onMounted, ref } from 'vue'
import { loadYandexMaps } from '@/useYandex.js'

const mapRef = ref(null)
const address = ref('')
const coordinates = ref([59.938784, 30.314997])

let map, placemark

const initMap = async () => {
  const ymaps = await loadYandexMaps()

  map = new ymaps.Map(mapRef.value, {
    center: coordinates.value,
    zoom: 10,
    controls: ['zoomControl', 'geolocationControl', 'searchControl'],
  })

  placemark = new ymaps.Placemark(coordinates.value, {}, { draggable: true })
  map.geoObjects.add(placemark)

  map.events.add('click', (e) => {
    const coords = e.get('coords')
    movePlacemark(coords, ymaps)
  })

  placemark.events.add('dragend', () => {
    const coords = placemark.geometry.getCoordinates()
    movePlacemark(coords, ymaps)
  })

  map.controls.get('searchControl').events.add('resultselect', async (e) => {
    const index = e.get('index')
    const result = await map.controls.get('searchControl').getResult(index)
    const coords = result.geometry.getCoordinates()
    movePlacemark(coords, ymaps)
  })
}

const movePlacemark = (coords, ymaps) => {
  placemark.geometry.setCoordinates(coords)
  coordinates.value = coords
  console.log(coordinates.value)

  ymaps.geocode(coords).then((res) => {
    const found = res.geoObjects.get(0)
    address.value = found?.getAddressLine() || ''
    console.log(address.value)
  })
}

onMounted(() => {
  initMap()
})

defineExpose({
  address,
  coordinates,
})
</script>

<template>
  <div class="flex flex-col gap-3 rounded-[20px]">
    <div ref="mapRef" class="w-full h-[500px] rounded-[20px] overflow-hidden"></div>
  </div>
</template>

<style scoped>
:deep(.ymaps-2-1-79-gototech) {
  display: none;
}
</style>
