<script setup>
import { onMounted, ref } from 'vue'
import { loadYandexMaps } from '@/useYandex.js'

const mapRef = ref(null)

const props = defineProps({
  coordinates: String,
})

let map, placemark

const initMap = async () => {
  const ymaps = await loadYandexMaps()

  const parsedCoords = props.coordinates.split(',').map(Number)

  map = new ymaps.Map(mapRef.value, {
    center: parsedCoords,
    zoom: 14,
    controls: ['zoomControl', 'geolocationControl'],
  })

  placemark = new ymaps.Placemark(
    parsedCoords,
    {},
    {
      draggable: false,
      iconColor: '#ff0000',
    },
  )

  map.geoObjects.add(placemark)

  const routePanelControl = new ymaps.control.RoutePanel({
    options: {
      autofocus: false,
      showHeader: true,
      float: 'right',
    },
  })
  routePanelControl.routePanel.state.set({
    type: 'auto',
    fromEnabled: true,
    toEnabled: false,
    to: parsedCoords,
  })
  map.controls.add(routePanelControl)
}

onMounted(() => {
  initMap()
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
