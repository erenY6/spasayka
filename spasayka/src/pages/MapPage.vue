<script setup>
import { onMounted, ref, watch } from 'vue'
import { useAdsStore } from '@/stores/adsStore'
import { loadYandexMaps } from '@/useYandex.js'
import { useRouter } from 'vue-router'

const adsStore = useAdsStore()
const mapRef = ref(null)
const ymapsInstance = ref(null)
const map = ref(null)
const selectedTags = ref(['tag-unknown', 'tag-foster', 'tag-shelter'])
const visibleAds = ref([])
const router = useRouter()

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
  ymapsInstance.value = await loadYandexMaps()

  map.value = new ymapsInstance.value.Map(mapRef.value, {
    center: [59.9311, 30.3609],
    zoom: 11,
    controls: ['zoomControl', 'geolocationControl'],
  })

  map.value.controls.add(
    new ymapsInstance.value.control.SearchControl({
      options: { size: 'large', placeholderContent: 'Поиск по адресу' },
    }),
  )

  map.value.events.add('boundschange', updateVisibleAds)

  renderPlacemarks()
  updateVisibleAds()
})

watch(
  selectedTags,
  () => {
    renderPlacemarks()
    updateVisibleAds()
  },
  { deep: true },
)

function filterByTags(ad) {
  return Array.isArray(ad.tags) && ad.tags.some((tag) => selectedTags.value.includes(tag.id))
}

function updateVisibleAds() {
  const bounds = map.value.getBounds()
  visibleAds.value = adsStore.ads.filter((ad) => {
    if (!ad.coordinates || !filterByTags(ad)) return false
    const [lat, lng] = ad.coordinates.split(',').map(Number)
    return lat >= bounds[0][0] && lat <= bounds[1][0] && lng >= bounds[0][1] && lng <= bounds[1][1]
  })
}

function renderPlacemarks() {
  map.value.geoObjects.removeAll()

  adsStore.ads.forEach((ad, index) => {
    try {
      const cleanAd = JSON.parse(JSON.stringify(ad))
      const [lat, lng] = cleanAd.coordinates.split(',').map(Number)
      if (isNaN(lat) || isNaN(lng)) return
      if (!Array.isArray(cleanAd.tags)) return
      if (!filterByTags(cleanAd)) return

      const placemark = new ymapsInstance.value.Placemark(
        [lat, lng],
        { hintContent: cleanAd.name || 'Без имени' },
        { preset: 'islands#dotIcon', iconColor: '#BA4A00' },
      )

      map.value.geoObjects.add(placemark)
    } catch (error) {
      console.error(`Ошибка при добавлении метки №${index + 1}`, error)
    }
  })
}
</script>

<template>
  <div class="flex h-screen w-full">
    <div class="w-[360px] p-4 bg-[#FAF3DD] border-r overflow-y-auto flex flex-col">
      <h2 class="text-lg font-semibold mb-2">Животные поблизости</h2>
      <div v-if="visibleAds.length === 0" class="text-gray-500 text-sm">
        Нет объявлений в зоне карты
      </div>
      <div
        v-for="ad in visibleAds"
        :key="ad.id"
        @click="() => router.push(`/ad/${ad.id}`)"
        class="cursor-pointer hover:bg-[#f0e4d5] p-3 rounded-md border mb-2"
      >
        <div class="font-semibold">{{ ad.name }}</div>
        <div class="text-sm text-gray-600">{{ ad.age }}, {{ ad.info1 }}</div>
      </div>
    </div>

    <div class="relative w-full">
      <div ref="mapRef" class="absolute inset-0 z-0"></div>
      <div class="absolute top-4 right-4 z-10 bg-white rounded-lg shadow-md p-4 max-w-[300px]">
        <h2 class="text-base font-semibold mb-2">Фильтр по статусу</h2>
        <div class="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
          <label v-for="tag in allTags" :key="tag.id" class="flex items-center gap-2">
            <input type="checkbox" :value="tag.id" v-model="selectedTags" />
            <span class="text-sm">{{ tag.label }}</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
