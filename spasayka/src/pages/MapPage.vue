<script setup>
import { onMounted, ref, watch } from 'vue'
import { useAdsStore } from '@/stores/adsStore'
import { loadYandexMaps } from '@/useYandex.js'
import { useRouter } from 'vue-router'
import MultiSelect from '@/components/MultiSelect.vue'
import withoutbg from '@/assets/allPictures/withoutbg.png'

import female from '@/assets/allPictures/female.svg'
import male from '@/assets/allPictures/male.svg'

const adsStore = useAdsStore()
const mapRef = ref(null)
const selectedTags = ref(['tag-unknown', 'tag-foster', 'tag-shelter'])
const visibleAds = ref([])
const router = useRouter()

let ymaps = null
let map = null
let routePanelControl = null

const allTags = [
  { id: 'tag-unknown', label: 'Не известно' },
  { id: 'tag-foster', label: 'Находится на передержке' },
  { id: 'tag-sterilized', label: 'Стерилизована/кастрирован' },
  { id: 'tag-outside', label: 'Находится на улице' },
  { id: 'tag-treatment', label: 'Проходит лечение' },
  { id: 'tag-shelter', label: 'Находится в приюте' },
  { id: 'tag-healthy', label: 'Здоров(а)' },
  { id: 'tag-litter-trained', label: 'Приучен к лотку' },
  { id: 'tag-with-other-pets', label: 'Готов к жизни в семье с другими питомцами' },
]

onMounted(async () => {
  await adsStore.loadAds()
  ymaps = await loadYandexMaps()

  map = new ymaps.Map(mapRef.value, {
    center: [59.9311, 30.3609],
    zoom: 11,
    controls: ['geolocationControl'],
  })

  routePanelControl = new ymaps.control.RoutePanel({
    options: {
      autofocus: false,
      showHeader: true,
      float: 'left',
    },
  })

  routePanelControl.routePanel.state.set({
    type: 'auto',
    fromEnabled: true,
    toEnabled: false,
  })
  map.controls.add(routePanelControl)

  map.controls.add
  new ymaps.control.SearchControl({
    options: { size: 'large', placeholderContent: 'Поиск по адресу' },
  })
  map.events.add('boundschange', updateVisibleAds)

  var zoomControl = new ymaps.control.ZoomControl({
    options: {
      size: 'large',
      position: { top: 225, left: 20 },
    },
  })
  map.controls.add(zoomControl)

  renderPlacemarks()
  updateVisibleAds()
})

const searchQuery = ref('')

async function searchAddress(query) {
  const res = await ymaps.geocode(query)
  const firstGeoObject = res.geoObjects.get(0)
  if (firstGeoObject) {
    const coords = firstGeoObject.geometry.getCoordinates()
    map.setCenter(coords, 14)
  }
}

watch(
  selectedTags,
  () => {
    renderPlacemarks()
    updateVisibleAds()
    console.log(selectedTags)
  },
  { deep: true },
)

function filterByTags(ad) {
  if (!selectedTags.value[0]) return true
  return Array.isArray(ad.tags) && ad.tags.some((tag) => selectedTags.value.includes(tag.id))
}

function updateVisibleAds() {
  const bounds = map.getBounds()
  visibleAds.value = adsStore.ads.filter((ad) => {
    if (!ad.coordinates || !filterByTags(ad)) return false
    const [lat, lng] = ad.coordinates.split(',').map(Number)
    return lat >= bounds[0][0] && lat <= bounds[1][0] && lng >= bounds[0][1] && lng <= bounds[1][1]
  })
}

function renderPlacemarks() {
  map.geoObjects.removeAll()

  adsStore.ads.forEach((ad, index) => {
    try {
      const [lat, lng] = ad.coordinates?.split(',').map(Number) || []
      if (!lat || !lng || !Array.isArray(ad.tags)) return
      if (!filterByTags(ad)) return

      const hintLayout = ymaps.templateLayoutFactory.createClass(
        `
  <div class="custom-hint">
    <strong>${ad.name}</strong>
  </div>
`,
        {
          getShape: function () {
            const el = this.getElement()
            if (el) {
              const firstChild = el.firstChild
              return new ymaps.shape.Rectangle(
                new ymaps.geometry.pixel.Rectangle([
                  [0, 0],
                  [firstChild.offsetWidth, firstChild.offsetHeight],
                ]),
              )
            }
            return null
          },
        },
      )

      const imageUrl = ad.images?.[0] ? 'http://localhost:3000' + ad.images[0].url : ''
      const placemark = new ymaps.Placemark(
        [lat, lng],
        { object: ad.name },
        {
          iconLayout: 'default#imageWithContent',
          iconImageHref: withoutbg,
          iconImageSize: [48, 48],
          iconContentLayout: ymaps.templateLayoutFactory.createClass(`
      <div style="
        z-index: 0;
        width: 48px;
        height: 48px;
        border-radius: 12px;
        overflow: hidden;
        border: 2px solid white;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
        transition: transform 0.3s;
        pointer-events: auto;
        cursor: pointer;
      ">
        <img src="${imageUrl}" style="
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          border-radius: 12px;
          pointer-events: none;
        " />
      </div>
    `),
          hintLayout: hintLayout,
          iconContentOffset: [-10, -37],
        },
      )

      placemark.events.add(['click'], () => {
        const coords = [lat, lng]

        if (routePanelControl?.routePanel.state.get('from')) {
          routePanelControl.routePanel.state.set({ to: coords })
          return
        }
        console.log('Метка нажата:', ad.id)
        router.push(`/ad/${ad.id}`)
      })

      map.geoObjects.add(placemark)
    } catch (error) {
      console.error(`Ошибка при добавлении метки №${index + 1}`, error)
    }
  })
}
</script>

<template>
  <div class="flex h-[calc(100vh-57px)] w-full">
    <div class="w-[360px] bg-[#f8f8f8] border-r overflow-y-auto flex flex-col">
      <h2 class="text-center font-[Signate_Grotesk] text-[22px] pt-4">Животные поблизости</h2>
      <div v-if="visibleAds.length === 0" class="text-gray-500 text-sm text-center pt-3">
        Нет объявлений в зоне карты
      </div>
      <div
        v-for="ad in visibleAds"
        :key="ad.id"
        @click="() => router.push(`/ad/${ad.id}`)"
        class="flex flex-row gap-3 cursor-pointer hover:bg-[#f0f0f0] px-5 py-4"
      >
        <img
          :src="'http://localhost:3000' + ad.images[0].url"
          class="w-[80px] h-[80px] rounded-[12px] object-cover"
        />
        <div class="flex flex-col justify-center">
          <div class="font-[Overpass_Black] text-[16px] flex flex-row items-center gap-2">
            {{ ad.name }}
            <img v-if="ad.gender === 'Девочка'" :src="female" class="w-[20px] h-[20px]" />
            <img v-else :src="male" class="w-[20px] h-[20px]" />
          </div>
          <div class="font-[Overpass_Regular] text-[14px] text-gray-600">
            {{ ad.age }}, {{ ad.info1 }}
          </div>
        </div>
      </div>
    </div>

    <div class="relative w-full h-[calc(100vh-57px)]">
      <div ref="mapRef" class="absolute inset-0 z-0"></div>
      <div class="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <input
          v-model="searchQuery"
          @keyup.enter="searchAddress(searchQuery)"
          placeholder="Поиск по адресу"
          class="w-[300px] px-4 py-3 rounded-lg bg-white shadow-md border border-gray-300 focus:outline-none"
        />
      </div>

      <div class="absolute right-[5px] z-10 p-4 max-w-[350px]">
        <MultiSelect v-model="selectedTags" :options="allTags" placeholder="Фильтр по статусу" />
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.ymaps-2-1-79-gototech) {
  display: none;
}
:deep(.ymaps-2-1-79-controls__control_toolbar) {
  border-radius: 20px !important;
  overflow: hidden;
}

:deep(.ymaps-2-1-79-popup_theme_ffffff) {
  border-radius: 20px !important;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}

:deep(.custom-hint) {
  display: inline-block;
  padding: 6px 12px;
  color: #333;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 12px;
  font-size: 13px;
  font-family: 'Segoe UI', sans-serif;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  pointer-events: none;
  white-space: nowrap;
}
</style>
