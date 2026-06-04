import { apiClient } from './client'
import type { MenuItem, MenuItemInput } from '../types/menu'

/**
 * Alle Backend-Aufrufe rund um die Speisekarte (Endpoints laut PDF).
 * Diese Funktionen werden in den Seiten/Hooks verwendet, damit die
 * Komponenten selbst nichts über axios wissen müssen.
 */

/** GET /menu – alle Gerichte holen. */
export async function getMenu(): Promise<MenuItem[]> {
  const response = await apiClient.get<MenuItem[]>('/menu')
  return response.data
}

/** GET /menu/{id} – ein einzelnes Gericht holen. */
export async function getMenuItem(id: string): Promise<MenuItem> {
  const response = await apiClient.get<MenuItem>(`/menu/${id}`)
  return response.data
}

/** POST /menu – neues Gericht anlegen. */
export async function createMenuItem(data: MenuItemInput): Promise<MenuItem> {
  const response = await apiClient.post<MenuItem>('/menu', data)
  return response.data
}

/** PUT /menu/{id} – bestehendes Gericht bearbeiten. */
export async function updateMenuItem(
  id: string,
  data: MenuItemInput,
): Promise<MenuItem> {
  const response = await apiClient.put<MenuItem>(`/menu/${id}`, data)
  return response.data
}

/** DELETE /menu/{id} – Gericht löschen. */
export async function deleteMenuItem(id: string): Promise<void> {
  await apiClient.delete(`/menu/${id}`)
}
