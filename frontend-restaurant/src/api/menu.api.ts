import { apiClient } from './client'
import type { MenuItem, MenuItemInput } from '../types/menu'

interface BackendMenu {
  menuId?: string
  name: string
  description: string
  price: number
  category: string
  imgUrl?: string
  chefsChoice?: boolean
}

function toMenuItem(menu: BackendMenu): MenuItem {
  return {
    id: menu.menuId ?? '',
    name: menu.name,
    description: menu.description,
    price: menu.price,
    category: menu.category,
    imageUrl: menu.imgUrl ?? '',
    chefsChoice: menu.chefsChoice ?? false,
  }
}

function toBackendMenu(input: MenuItemInput): BackendMenu {
  return {
    name: input.name,
    description: input.description,
    price: input.price,
    category: input.category,
    imgUrl: input.imageUrl,
    chefsChoice: input.chefsChoice,
  }
}

export async function getMenu(): Promise<MenuItem[]> {
  const response = await apiClient.get<BackendMenu[]>('/menus')
  return response.data.map(toMenuItem)
}

export async function getMenuItem(id: string): Promise<MenuItem> {
  const response = await apiClient.get<BackendMenu>(`/menus/${id}`)
  return toMenuItem(response.data)
}

export async function createMenuItem(data: MenuItemInput): Promise<MenuItem> {
  const response = await apiClient.post<BackendMenu>('/menus', toBackendMenu(data))
  return toMenuItem(response.data)
}

export async function updateMenuItem(
  id: string,
  data: MenuItemInput,
): Promise<MenuItem> {
  const response = await apiClient.put<BackendMenu>(`/menus/${id}`, toBackendMenu(data))
  return toMenuItem(response.data)
}

export async function deleteMenuItem(id: string): Promise<void> {
  await apiClient.delete(`/menus/${id}`)
}
