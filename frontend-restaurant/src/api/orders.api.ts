import { apiClient } from './client'
import type { Order, OrderItem, OrderStatus } from '../types/order'

interface BackendOrderItem {
  menuItemId?: string
  name: string
  quantity: number
  price: number
}

interface BackendOrder {
  orderId?: string
  items: BackendOrderItem[]
  total: number
  customerName: string
  createdAt: string
  status: OrderStatus
}

function toOrderItem(item: BackendOrderItem): OrderItem {
  return {
    menuItemId: item.menuItemId ?? '',
    name: item.name,
    quantity: item.quantity,
    price: item.price,
  }
}

function toOrder(order: BackendOrder): Order {
  return {
    id: order.orderId ?? '',
    items: order.items.map(toOrderItem),
    total: order.total,
    customerName: order.customerName,
    createdAt: order.createdAt,
    status: order.status,
  }
}

export async function getOrders(): Promise<Order[]> {
  const response = await apiClient.get<BackendOrder[]>('/orders')
  return response.data.map(toOrder)
}

export async function getOrder(id: string): Promise<Order> {
  const response = await apiClient.get<BackendOrder>(`/orders/${id}`)
  return toOrder(response.data)
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus,
): Promise<Order> {
  const response = await apiClient.put<BackendOrder>(`/orders/${id}/status`, {
    status,
  })
  return toOrder(response.data)
}
