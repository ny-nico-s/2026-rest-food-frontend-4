export const ORDER_STATUSES = [
  'PENDING',
  'IN_PROGRESS',
  'READY',
  'COMPLETED',
  'CANCELLED',
] as const

export type OrderStatus = (typeof ORDER_STATUSES)[number]

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: 'Offen',
  IN_PROGRESS: 'In Arbeit',
  READY: 'Bereit',
  COMPLETED: 'Abgeschlossen',
  CANCELLED: 'Storniert',
}

export interface OrderItem {
  menuItemId: string
  name: string
  quantity: number
  price: number
}

export interface Order {
  id: string
  items: OrderItem[]
  total: number
  customerName: string
  createdAt: string
  status: OrderStatus
}
