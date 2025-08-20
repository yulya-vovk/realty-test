<script lang="ts" setup>
import type {ApartmentSortField, useApartmentsStore} from "~/stores/apartments";
import ButtonUp from "./ButtonUp.vue";

const props = defineProps<{
  store: ReturnType<typeof useApartmentsStore>
}>()

async function onSortClick(field: ApartmentSortField) {
  const currentField = props.store.sortField
  const currentOrder = props.store.sortOrder

  if (currentField !== field || !currentOrder) {
    props.store.setSort(field, 'asc')
  } else if (currentOrder === 'asc') {
    props.store.setSort(field, 'desc')
  } else if (currentOrder === 'desc') {
    props.store.setSort(null, null)
  }

  await props.store.reload()
}
</script>

<template>
  <table class="apartments__table">
    <thead>
    <tr>
      <th class="apartments__col apartments__col--planning">Планировка</th>
      <th class="apartments__col apartments__col--title">Квартира</th>
      <th
          :aria-sort="store.sortField === 'square' ? (store.sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'"
          :class="['apartments__col', 'apartments__col--square', 'apartments__col--sortable', { 'apartments__col--sorted': store.sortField === 'square' }]"
          @click="onSortClick('square')"
          role="button"
          aria-label="Сортировать по площади"
      >
        <span class="apartments__th-content">S, м² <SortArrow :direction="store.sortField === 'square' ? store.sortOrder : 'none'"/></span>
      </th>
      <th
          :aria-sort="store.sortField === 'floor' ? (store.sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'"
          :class="['apartments__col', 'apartments__col--floor', 'apartments__col--sortable', { 'apartments__col--sorted': store.sortField === 'floor' }]"
          @click="onSortClick('floor')"
          role="button"
          aria-label="Сортировать по этажу"
      >
        <span class="apartments__th-content">Этаж <SortArrow
            :direction="store.sortField === 'floor' ? store.sortOrder : 'none'"/></span>
      </th>
      <th
          :aria-sort="store.sortField === 'price' ? (store.sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'"
          :class="['apartments__col', 'apartments__col--price', 'apartments__col--sortable', { 'apartments__col--sorted': store.sortField === 'price' }]"
          @click="onSortClick('price')"
          role="button"
          aria-label="Сортировать по цене"
      >
        <span class="apartments__th-content">Цена, ₽ <SortArrow
            :direction="store.sortField === 'price' ? store.sortOrder : 'none'"/></span>
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-if="(!store.items || !store.items.length) && !store.loading && !store.error">
      <td colspan="5" class="apartments__not-found">Ничего не найдено</td>
    </tr>
    <tr v-for="item in store.items" v-else :key="item.id">
      <td class="apartments__col apartments__col--planning">
        <NuxtImg
            :src="item.planning_url"
            alt="Планировка"
            fit="contain"
            height="80"
            width="80"
        />
      </td>
      <td class="apartments__col apartments__col--title">
        {{ item.title }}
      </td>
      <td class="apartments__col apartments__col--square">
        {{ item.square.toLocaleString('ru-RU') }}
      </td>
      <td class="apartments__col apartments__col--floor">
        {{ item.floor }} <span class="apartments__semi-transparent">из {{ item.max_floor }}</span>
      </td>
      <td class="apartments__col apartments__col--price">
        {{ item.price.toLocaleString('ru-RU') }}
      </td>
    </tr>
    </tbody>
    
    <tfoot>
    <tr v-if="store.loading">
      <td class="apartments__loading-cell" colspan="5">
        <Spinner :size="24" aria-label="Загрузка" aria-live="polite"/>
      </td>
    </tr>
    <tr v-if="store.error">
      <td colspan="5" class="apartments__error" aria-live="assertive">Ошибка: {{ store.error }}</td>
    </tr>
    </tfoot>
  </table>
  <ButtonUp aria-label="Наверх" />
</template>

<style lang="sass" scoped>

.apartments__table
  width: 100%
  border-collapse: collapse

  thead
    th
      font-size: 14px
      font-weight: normal
      color: #0B1739

      &.apartments__col--sortable
        cursor: pointer

        .apartments__th-content
          display: inline-flex
          align-items: center
          gap: 6px

      &.apartments__col--sorted
        color: #3EB57C

  td, th
    border-bottom: solid 1px #ccc
    text-align: left
    vertical-align: top
    padding: 16px 16px 20px 16px

    &.apartments__col--planning
      width: 10%
      padding-left: 0

    &.apartments__col--title
      width: 50%

    &.apartments__col--price
      padding-right: 0

.apartments__semi-transparent
  opacity: 0.5

.apartments__loading-cell
  text-align: center
  padding: 24px 0

.apartments__not-found
  text-align: center
  color: #999

.apartments__error
  color: #d00

@media (max-width: 1440px)
  .apartments__table
    font-size: 13px
    td, th
    padding: 12px 8px 16px 8px
@media (max-width: 960px)
  .apartments__table
    font-size: 12px
    td, th
      padding: 8px 4px 12px 4px
</style>