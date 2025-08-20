import {defineStore} from 'pinia'

export interface Apartment {
    id: string
    title: string
    planning_url: string
    rooms_count: number
    square: number
    floor: number
    max_floor: number
    price: number
}

interface Response {
    apartments: Apartment[]
    available_rooms: number[]
    min_price: number
    max_price: number
    min_square: number
    max_square: number
    total_count: number
}

export type ApartmentSortField = 'square' | 'floor' | 'price'
export type ApartmentSortOrder = 'asc' | 'desc' | null

interface ApartmentFilter {
    rooms: number[]
    min_price: number | null
    max_price: number | null
    min_square: number | null
    max_square: number | null
}

interface State {
    items: Apartment[]
    loading: boolean
    error: string | null
    page: number
    sortField: ApartmentSortField | null
    sortOrder: ApartmentSortOrder

    available_rooms: Set<number> | null
    min_price: number | null
    max_price: number | null
    min_square: number | null
    max_square: number | null
    total_count: number | null

    filter: ApartmentFilter
}

export const useApartmentsStore = defineStore('apartments', {
    state: (): State => ({
        items: [],
        loading: false,
        error: null,
        page: 0,
        sortField: 'price',
        sortOrder: 'asc',

        available_rooms: null,
        min_price: null,
        max_price: null,
        min_square: null,
        max_square: null,
        total_count: null,

        filter: {
            rooms: [],
            min_price: null,
            max_price: null,
            min_square: null,
            max_square: null,
        },
    }),
    actions: {
        setSort(field: ApartmentSortField | null, order: ApartmentSortOrder) {
            this.sortField = field
            this.sortOrder = order
        },
        setFilter(filter: ApartmentFilter) {
            this.filter = filter
        },
        async reload(): Promise<Apartment[]> {
            this.items = []
            this.page = 0
            return await this.loadNextPage()
        },
        async loadNextPage(): Promise<Apartment[]> {
            if (this.loading) return this.items
            this.loading = true
            this.error = null
            try {
                const params = new URLSearchParams({
                    page: String(this.page + 1),
                })
                if (this.sortField && this.sortOrder) {
                    params.set('sortField', this.sortField)
                    params.set('sortOrder', this.sortOrder)
                }
                if (this.filter) {
                    if (this.filter.rooms.length) {
                        params.set('rooms', this.filter.rooms.join(','))
                    }
                    if (this.filter.min_price !== null) {
                        params.set('min_price', this.filter.min_price.toString())
                    }
                    if (this.filter.max_price !== null) {
                        params.set('max_price', this.filter.max_price.toString())
                    }
                    if (this.filter.min_square !== null) {
                        params.set('min_square', this.filter.min_square.toString())
                    }
                    if (this.filter.max_square !== null) {
                        params.set('max_square', this.filter.max_square.toString())
                    }
                }

                const data = await $fetch<Response>(`/apartments.json?${params.toString()}`)

                this.items = [...this.items, ...data.apartments]

                this.available_rooms = new Set(data.available_rooms)
                this.min_price = data.min_price
                this.max_price = data.max_price
                this.min_square = data.min_square
                this.max_square = data.max_square
                this.total_count = data.total_count

                this.page++
                return this.items
            } catch (e: unknown) {
                this.error = e instanceof Error ? e.message : 'Ошибка'
                return this.items
            } finally {
                this.loading = false
            }
        },
    },
    
}
)
