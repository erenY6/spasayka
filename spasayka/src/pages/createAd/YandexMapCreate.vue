<script setup>
import { onMounted, ref, watch } from 'vue'
import { loadYandexMaps } from '@/useYandex.js'

const props = defineProps({
  isEdit: { type: Boolean, required: false },
  coordinatesEdit: { type: Array, required: false },
})

const mapRef = ref(null)
const address = ref('')
const coordinates = ref([])

let map, placemark

const initMap = async () => {
  const ymaps = await loadYandexMaps()

  map = new ymaps.Map(mapRef.value, {
    center: coordinates.value,
    zoom: 10,
    controls: ['zoomControl', 'geolocationControl'],
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

  const searchControl = map.controls.get('searchControl')
  if (searchControl) {
    searchControl.events.add('resultselect', async (e) => {
      const index = e.get('index')
      const result = await searchControl.getResult(index)
      const coords = result.geometry.getCoordinates()
      movePlacemark(coords, ymaps)
    })
  }
}

const movePlacemark = (coords, ymaps) => {
  placemark.geometry.setCoordinates(coords)
  coordinates.value = coords

  ymaps.geocode(coords).then((res) => {
    const found = res.geoObjects.get(0)
    address.value = found?.getAddressLine() || ''
  })
}

onMounted(async () => {
  console.log('ffff', props.isEdit, props.coordinatesEdit)

  if (props.isEdit === true && props.coordinatesEdit != null) {
    coordinates.value = props.coordinatesEdit
  } else {
    coordinates.value = [59.938784, 30.314997]
  }
  await initMap()
})

watch(
  () => props.coordinatesEdit,
  (newCoords) => {
    if (props.isEdit === true && newCoords) {
      coordinates.value = newCoords
      initMap()
    }
  },
  { immediate: true },
)

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
