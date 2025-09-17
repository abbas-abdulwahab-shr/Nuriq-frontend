export interface PriceItem {
  id: number
  name: string
  price: number
  change: number // percentage
  trend: Array<number> // sparkline data
}

export const priceTracker: Array<PriceItem> = [
  {
    id: 1,
    name: 'Sea Moss',
    price: 20,
    change: -1.2,
    trend: [19, 20, 21, 20, 19.5, 20],
  },
  {
    id: 2,
    name: 'Lemon Extract',
    price: 40,
    change: +1.2,
    trend: [38, 39, 40, 41, 40.5, 40],
  },
]
