<script setup>
import { ref, watch } from 'vue'
import circle from '@/assets/allPictures/circle.svg'
import circleMark from '@/assets/allPictures/circleMark.svg'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['update:modelValue'])

const options = [
  { label: 'Не известно', value: 'tag-unknown' },
  { label: 'Находится на передержке', value: 'tag-foster' },
  { label: 'Стерилизована/кастрирован', value: 'tag-sterilized' },
  { label: 'Находится на улице', value: 'tag-outside' },
  { label: 'Проходит лечение', value: 'tag-treatment' },
  { label: 'Находится в приюте', value: 'tag-shelter' },
  { label: 'Здоров(а)', value: 'tag-healthy' },
  { label: 'Приучен к лотку', value: 'tag-litter-trained' },
  { label: 'Готов к жизни в семье с другими питомцами', value: 'tag-with-other-pets' },
]

const selected = ref([...props.modelValue])

watch(
  () => props.modelValue,
  (newVal) => {
    selected.value = [...newVal]
  },
)

const toggleOption = (value) => {
  const index = selected.value.indexOf(value)
  const hasUnknown = selected.value.includes('tag-unknown')
  const isStreet = value === 'tag-outside'
  const isFoster = value === 'tag-foster'
  const isShelter = value === 'tag-shelter'

  if (value === 'tag-unknown') {
    if (index !== -1) {
      selected.value = []
    } else {
      selected.value = ['tag-unknown']
    }
  } else {
    if (hasUnknown) return
    if (
      isStreet &&
      (selected.value.includes('tag-shelter') || selected.value.includes('tag-foster'))
    )
      return
    if ((isFoster || isShelter) && selected.value.includes('tag-outside')) return

    if (index === -1) {
      selected.value.push(value)
    } else {
      selected.value.splice(index, 1)
    }
  }

  emit('update:modelValue', [...selected.value])
}
</script>

<template>
  <div class="w-[384px] h-full px-8 py-5 bg-[#CEBBAA] rounded-[20px]">
    <ul class="w-full flex flex-col gap-y-[22px]">
      <li
        v-for="option in options"
        :key="option.value"
        @click="toggleOption(option.value)"
        class="flex items-center gap-3 cursor-pointer"
      >
        <img
          :src="selected.includes(option.value) ? circleMark : circle"
          alt="status-icon"
          class="w-6 h-6"
        />
        <span class="font-[Overpass_Bold] text-[16px]">{{ option.label }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
li {
  user-select: none;
}
</style>
