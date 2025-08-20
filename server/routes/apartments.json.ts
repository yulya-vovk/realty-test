import {randomUUID} from 'node:crypto'
import {eventHandler, getQuery} from 'h3'

interface Apartment {
    id: string
    title: string
    planning_url: string
    rooms_count: number
    square: number
    floor: number
    max_floor: number
    price: number
}

interface Query {
    page: number | undefined
    sortField: string | undefined
    sortOrder: string | undefined

    rooms: number[] | undefined
    min_price: number | undefined
    max_price: number | undefined
    min_square: number | undefined
    max_square: number | undefined
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

const ALL_ITEMS: Apartment[] = Array.from({length: 100}).map((_, i) => {
    const rooms = 1 + Math.floor(Math.random() * 4) // 1..4
    const maxFloor = 9 + Math.floor(Math.random() * 12) // 9..20
    const floor = 1 + Math.floor(Math.random() * maxFloor)
    const square = Math.round((25 + Math.random() * 90) * 10) / 10 // 25.0..115.0
    const base = square * 90000 + rooms * 300000
    const price = Math.round(base + Math.random() * 500000)

    return {
        id: randomUUID(),
        title: `${rooms}-комнатная №${i + 1}`,
        planning_url: "https://img.samoletplus.ru/insecure/plain/s3://smltplus-public-media/article-block-images/df14bd726dd5459c88a1ed19bf5d6b26.png",
        rooms_count: rooms,
        square,
        floor,
        max_floor: maxFloor,
        price,
    }
})

export default eventHandler(async (event): Promise<Response> => {
    // Artificial delay to simulate network/processing latency
    await new Promise((resolve) => setTimeout(resolve, 500))

    const query = getQuery<Query>(event)

    // Sorting
    const sortField = String(query.sortField || '') as keyof Apartment
    const sortOrder = String(query.sortOrder || 'asc')
    const allowedFields: Array<keyof Apartment> = ['square', 'floor', 'price']
    const orderMultiplier = sortOrder === 'desc' ? -1 : 1

    let source: Apartment[] = ALL_ITEMS
    if (allowedFields.includes(sortField)) {
        source = [...ALL_ITEMS].sort((a, b) => {
            const av = a[sortField] as number
            const bv = b[sortField] as number
            if (av === bv) return 0
            return av < bv ? -1 * orderMultiplier : 1 * orderMultiplier
        })
    }

    if (query.rooms) {
        const rooms = String(query.rooms || '').split(',').filter(x => x !== '').map(x => parseInt(x))
        source = source.filter(x => rooms.includes(x.rooms_count))
    }
    if (query.min_price) {
        source = source.filter(x => x.price >= (query.min_price ?? 0))
    }
    if (query.max_price) {
        source = source.filter(x => x.price <= (query.max_price ?? 0))
    }
    if (query.min_square) {
        source = source.filter(x => x.square >= (query.min_square ?? 0))
    }
    if (query.max_square) {
        source = source.filter(x => x.square <= (query.max_square ?? 0))
    }

    // Pagination (5 items per request)
    const page = Number(query.page || 1)
    const perPage = 5
    const start = (page - 1) * perPage
    const end = start + perPage

    const items = start >= 0 ? source.slice(start, end) : source.slice(0, perPage)

    return {
        apartments: items,
        available_rooms: Array.from(new Set(ALL_ITEMS.map(x => x.rooms_count))),
        min_price: Math.min(...ALL_ITEMS.map(x => x.price)),
        max_price: Math.max(...ALL_ITEMS.map(x => x.price)),
        min_square: Math.min(...ALL_ITEMS.map(x => x.square)),
        max_square: Math.max(...ALL_ITEMS.map(x => x.square)),
        total_count: source.length
    }
})
