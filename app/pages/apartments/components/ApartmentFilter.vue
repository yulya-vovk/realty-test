<script lang="ts" setup>
import {ref, watchEffect} from 'vue'
import {useApartmentsStore} from "~/stores/apartments";
import ToggleButton from "~/pages/apartments/components/ToggleButton.vue";

const store = useApartmentsStore()

// Local toggle states for rooms 1-3 (4к disabled per UI)
const room1 = ref<boolean>(store.filter.rooms.includes(1))
const room3 = ref<boolean>(store.filter.rooms.includes(3))
const room4 = ref<boolean>(store.filter.rooms.includes(4))
const room2 = ref<boolean>(store.filter.rooms.includes(2))

const min_price = ref<number | null>(null)
const max_price = ref<number | null>(null)
const min_square = ref<number | null>(null)
const max_square = ref<number | null>(null)

async function updateFilter() {
  const rooms: number[] = []
  if (room1.value) rooms.push(1)
  if (room2.value) rooms.push(2)
  if (room3.value) rooms.push(3)
  if (room4.value) rooms.push(4)

  store.setFilter({
    rooms,
    min_price: min_price.value,
    max_price: max_price.value,
    min_square: min_square.value,
    max_square: max_square.value,
  })
  await store.reload()
}

async function resetFilter() {
  room1.value = true
  room2.value = true
  room3.value = true
  room4.value = true

  min_price.value = null
  max_price.value = null
  min_square.value = null
  max_square.value = null

  store.setFilter({
    rooms: [],
    min_price: null,
    max_price: null,
    min_square: null,
    max_square: null,
  })
  await store.reload()
}

watchEffect(() => {
  room1.value = store.filter.rooms.includes(1)
  room2.value = store.filter.rooms.includes(2)
  room3.value = store.filter.rooms.includes(3)
  room4.value = store.filter.rooms.includes(4)

  min_price.value = store.filter.min_price || store.min_price
  max_price.value = store.filter.max_price || store.max_price
  min_square.value = store.filter.min_square || store.min_square
  max_square.value = store.filter.max_square || store.max_square
})
</script>

<template>
  <div class="apartments-filter">
    <div class="rooms-filter">
      <ToggleButton v-model="room1" :disabled="!store.available_rooms?.has(1)" aria-label="1 комната"
                    @change="updateFilter">1к
      </ToggleButton>
      <ToggleButton v-model="room2" :disabled="!store.available_rooms?.has(2)" aria-label="2 комнаты"
                    @change="updateFilter">2к
      </ToggleButton>
      <ToggleButton v-model="room3" :disabled="!store.available_rooms?.has(3)" aria-label="3 комнаты"
                    @change="updateFilter">3к
      </ToggleButton>
      <ToggleButton v-model="room4" :disabled="!store.available_rooms?.has(4)" aria-label="4 комнаты"
                    @change="updateFilter">4к
      </ToggleButton>
    </div>

    <div class="price-filter">
      Стоимость квартиры, ₽
      <div v-if="min_price !== null && max_price !== null" class="from-to">
        <div class="from">
          <span class="label">от </span>
          <span class="value">{{ min_price.toLocaleString('ru-RU') }}</span>
        </div>
        <div class="to">
          <span class="label">до </span>
          <span class="valuee">{{ max_price.toLocaleString('ru-RU') }}</span>
        </div>
      </div>

      <SliderRoot
          :default-value="[store.min_price, store.max_price]"
          :model-value="[min_price, max_price]"
          :max="store.max_price"
          :min="store.min_price"
          class="slider relative flex items-center select-none touch-none w-[200px] h-5"
          @update:model-value="payload => { min_price = payload[0]; max_price = payload[1] }"
          @value-commit="updateFilter"
      >
        <SliderTrack class="track relative grow rounded-full h-[3px]">
          <SliderRange class="range absolute bg-white rounded-full h-full"/>
        </SliderTrack>
        <SliderThumb class="thumb block w-5 h-5 rounded-[10px]"/>
        <SliderThumb class="thumb block w-5 h-5 rounded-[10px]"/>
      </SliderRoot>
    </div>

    <div class="square-filter">
      Площадь квартиры, м²
      <div v-if="store.min_square !== null && store.max_square !== null" class="from-to">
        <div class="from">
          <span class="label">от </span>
          <span class="value">{{ min_square.toLocaleString('ru-RU') }}</span>
        </div>
        <div class="to">
          <span class="label">до </span>
          <span class="value">{{ max_square.toLocaleString('ru-RU') }}</span>
        </div>
      </div>

      <SliderRoot
          :default-value="[store.min_square, store.max_square]"
          :model-value="[min_square, max_square]"
          :max="store.max_square"
          :min="store.min_square"
          class="slider relative flex items-center select-none touch-none w-[200px] h-5"
          @update:model-value="payload => { min_square = payload[0]; max_square = payload[1] }"
          @value-commit="updateFilter"
      >
        <SliderTrack class="track relative grow rounded-full h-[3px]">
          <SliderRange class="range absolute bg-white rounded-full h-full"/>
        </SliderTrack>
        <SliderThumb class="thumb block w-5 h-5 rounded-[10px]"/>
        <SliderThumb class="thumb block w-5 h-5 rounded-[10px]"/>
      </SliderRoot>
    </div>

    <button class="reset-btn" @click="resetFilter">
      Сбросить параметры

      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.99996 5.22223L1.37727 7.84492C1.12213 8.10007 0.641687 8.0333 0.304183 7.6958C-0.0333213 7.35829 -0.100086 6.87786 0.15506 6.62271L2.77775 4.00002L0.155017 1.37729C-0.100129 1.12214 -0.0333644 0.641701 0.30414 0.304197C0.641644 -0.0333071 1.12208 -0.100072 1.37723 0.155074L3.99996 2.77781L6.62282 0.154956C6.87796 -0.10019 7.3584 -0.0334256 7.6959 0.304079C8.03341 0.641583 8.10017 1.12202 7.84503 1.37717L5.22217 4.00002L7.84498 6.62283C8.10013 6.87797 8.03336 7.35841 7.69586 7.69592C7.35836 8.03342 6.87792 8.10019 6.62277 7.84504L3.99996 5.22223Z" fill="#FF0000"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.99996 5.22223L1.37727 7.84492C1.12213 8.10007 0.641687 8.0333 0.304183 7.6958C-0.0333213 7.35829 -0.100086 6.87786 0.15506 6.62271L2.77775 4.00002L0.155017 1.37729C-0.100129 1.12214 -0.0333644 0.641701 0.30414 0.304197C0.641644 -0.0333071 1.12208 -0.100072 1.37723 0.155074L3.99996 2.77781L6.62282 0.154956C6.87796 -0.10019 7.3584 -0.0334256 7.6959 0.304079C8.03341 0.641583 8.10017 1.12202 7.84503 1.37717L5.22217 4.00002L7.84498 6.62283C8.10013 6.87797 8.03336 7.35841 7.69586 7.69592C7.35836 8.03342 6.87792 8.10019 6.62277 7.84504L3.99996 5.22223Z" fill="#0B1739"/>
      </svg>
    </button>
  </div>
</template>

<style lang="sass" scoped>
.apartments-filter
  position: sticky
  top: 16px
  z-index: 1
  padding: 40px
  background: rgba(174, 228, 178, 0.3)
  border-radius: 8px

.rooms-filter
  margin-bottom: 1em

.price-filter, .square-filter
  margin-top: 1em

.from-to
  display: flex
  gap: 20px
  font-size: 14px

  .from, .to
    flex: 1

  span.label
    color: #999

.slider
  .track
    background: #ccc

  .thumb
    background: #3EB57C
    cursor: pointer

    &:focus
      outline: none

  .range
    background: #3EB57C

.reset-btn
  margin-top: 1em
  cursor: pointer

  svg
    display: inline

@media (max-width: 1440px)
  .apartments-filter
    padding: 24px
    
@media (max-width: 960px)
  .apartments-filter
    padding: 12px
</style>