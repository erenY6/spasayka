<script setup>
import { ref, watch, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  options: Array,
  modelValue: Array,
  placeholder: String,
})

const emit = defineEmits(['update:modelValue'])

const open = ref(false)
const menuRef = ref(null)
const selected = ref([...props.modelValue])

const selectedLabels = computed(() =>
  props.options.filter((tag) => selected.value.includes(tag.id)),
)

function toggleDropdown() {
  open.value = !open.value
}

const handleClickOutside = (event) => {
  if (menuRef.value && !menuRef.value.contains(event.target)) {
    open.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

function selectTag(id) {
  selected.value.push(id)
  emit('update:modelValue', selected.value)
}

function removeTag(id) {
  selected.value = selected.value.filter((tagId) => tagId !== id)
  emit('update:modelValue', selected.value)
}

watch(
  () => props.modelValue,
  (newVal) => {
    selected.value = [...newVal]
  },
)
</script>

<template>
  <div class="select-multiple" :class="{ open }">
    <div class="select-box" @click.stop="toggleDropdown">
      <span v-if="!selectedLabels.length">{{ placeholder }}</span>
      <template v-for="(tag, index) in selectedLabels" :key="index">
        <div class="selected-item">
          <em>{{ tag.label }}</em>
          <i @click.stop="removeTag(tag.id)"></i>
        </div>
      </template>
      <div class="arrow"></div>
    </div>
    <ul v-show="open" ref="menuRef">
      <li
        v-for="tag in options.filter((tag) => !selected.includes(tag.id))"
        :key="tag.id"
        @click="selectTag(tag.id)"
      >
        {{ tag.label }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.select-multiple {
  width: 300px;
  position: relative;
  font-size: 14px;
}
.select-box {
  background: white;
  border-radius: 8px;
  padding: 15px 10px 15px;
  box-shadow: 0 4px 16px rgba(22, 42, 90, 0.12);
  min-height: 44px;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
}
.select-box span {
  color: #99a3ba;
  line-height: 28px;
}
.selected-item {
  background: rgba(228, 236, 250, 0.7);
  padding: 0 24px 6px 8px;
  line-height: 28px;
  border-radius: 4px;
  position: relative;
}
.selected-item em {
  font-style: normal;
}
.selected-item i {
  position: absolute;
  top: 0;
  right: 0;
  width: 24px;
  height: 28px;
  cursor: pointer;
}
.selected-item i::before,
.selected-item i::after {
  content: '';
  position: absolute;
  width: 2px;
  height: 10px;
  background: #4d18ff;
  left: 50%;
  top: 50%;
  border-radius: 1px;
}
.selected-item i::before {
  transform: translate(-50%, -50%) rotate(45deg);
}
.selected-item i::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}
.arrow {
  margin-left: auto;
  position: relative;
  width: 28px;
  height: 28px;
}
.arrow::before,
.arrow::after {
  content: '';
  position: absolute;
  width: 2px;
  height: 8px;
  border-bottom: 8px solid #99a3ba;
  top: 50%;
  transform: translateY(-50%);
}
.arrow::before {
  right: 12px;
  transform: rotate(-130deg);
}
.arrow::after {
  left: 9px;
  transform: rotate(130deg);
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  background: white;
  width: 100%;
  top: 100%;
  border-radius: 8px;
  box-shadow: 0 12px 20px rgba(22, 42, 90, 0.08);
  max-height: 250px;
  overflow-y: auto;
  z-index: 10;
}
ul li {
  padding: 12px 16px;
  cursor: pointer;
  transition: 0.3s;
}
ul li:hover {
  background: #4d18ff;
  color: white;
}
</style>
