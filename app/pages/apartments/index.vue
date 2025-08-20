<script lang="ts" setup>
import ApartmentList from "~/pages/apartments/components/ApartmentList.vue";
import {useApartmentsStore} from "~/stores/apartments";
import ApartmentFilter from "~/pages/apartments/components/ApartmentFilter.vue";

defineOptions({name: 'ApartmentListPage'})

useHead({title: 'Квартиры'})

const store = useApartmentsStore()

await useAsyncData('apartments', () => store.reload())
</script>

<template>
  <div class="apartments-page">
    <div class="content">
      <h1>Квартиры</h1>

        <section>
          <ApartmentList :store="store"/>
        </section>

      <div v-if="store.total_count > store.items.length" class="actions">
        <button :disabled="store.loading" class="load-more" type="button" @click="store.loadNextPage()">
          {{ store.loading ? 'Загрузка…' : 'Загрузить ещё' }}
        </button>
      </div>
    </div>
    <div class="panel-right">
        <section>
          <ApartmentFilter/>
        </section>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.apartments-page
  min-width: 640px
  max-width: 1440px
  margin: 0 auto
  padding: 16px
  display: flex
  gap: 40px

  .content
    flex: 1

h1
  font-size: 2em

.load-more
  gap: 10px
  margin-top: 16px
  padding: 8px 24px
  border-radius: 25px
  border: 1px solid #0B173933
  background: #fff
  cursor: pointer
  font-size: 16px
.panel-right
  position: sticky
  top: 16px
  align-self: flex-start

@media (max-width: 1440px)
  .apartments-page
    max-width: 100%
    gap: 24px
@media (max-width: 960px)
  .apartments-page
    flex-direction: column
    gap: 12px
    padding: 8px
</style>
