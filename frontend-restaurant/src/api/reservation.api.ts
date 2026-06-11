import { apiClient } from './client'
import type {
  Reservation,
  ReservationInput,
  RestaurantTable,
  TableInput,
} from '../types/reservation'

type BackendReservation = {
  id?: string
  reservationId?: string
  start: string
  end: string
  numerOfPeople?: number
  numberOfPeople?: number
  reserveeLastName: string
  reserveePhoneNumber: string
  tables?: { id?: string }[]
}

type BackendTable = {
  id?: string
  tableId?: string
  tableNumber?: number
  numSeats: number
}

function toReservation(b: BackendReservation): Reservation {
  return {
    id: b.reservationId ?? b.id ?? '',
    start: b.start,
    end: b.end,
    numberOfPeople: b.numberOfPeople ?? b.numerOfPeople ?? 0,
    reserveeLastName: b.reserveeLastName,
    reserveePhoneNumber: b.reserveePhoneNumber,
    tableIds: (b.tables ?? []).map((t) => t.id ?? '').filter(Boolean),
  }
}

function toBackendReservation(input: ReservationInput) {
  return {
    start: input.start,
    end: input.end,
    numerOfPeople: input.numberOfPeople,
    numberOfPeople: input.numberOfPeople,
    reserveeLastName: input.reserveeLastName,
    reserveePhoneNumber: input.reserveePhoneNumber,
    tables: input.tableIds.map((id) => ({ id })),
  }
}

function toTable(b: BackendTable): RestaurantTable {
  return {
    id: b.tableId ?? b.id ?? '',
    numSeats: b.numSeats,
    tableNumber: b.tableNumber,
  }
}

function toBackendTable(input: TableInput) {
  const body: Record<string, number> = { numSeats: input.numSeats }
  if (input.tableNumber !== undefined) {
    body.tableNumber = input.tableNumber
  }
  return body
}

export async function getTables(): Promise<RestaurantTable[]> {
  const response = await apiClient.get<BackendTable[]>('/tables')
  return response.data.map(toTable)
}

export async function createTable(input: TableInput): Promise<RestaurantTable> {
  const response = await apiClient.post<BackendTable>('/tables', toBackendTable(input))
  return toTable(response.data)
}

export async function updateTable(
  id: string,
  input: TableInput,
): Promise<RestaurantTable> {
  const response = await apiClient.put<BackendTable>(`/tables/${id}`, toBackendTable(input))
  return toTable(response.data)
}

export async function deleteTable(id: string): Promise<void> {
  await apiClient.delete(`/tables/${id}`)
}

export async function getReservations(): Promise<Reservation[]> {
  const response = await apiClient.get<BackendReservation[]>('/reservations')
  return response.data.map(toReservation)
}

export async function createReservation(
  input: ReservationInput,
): Promise<Reservation> {
  const response = await apiClient.post<BackendReservation>(
    '/reservations',
    toBackendReservation(input),
  )
  return toReservation(response.data)
}

export async function deleteReservation(id: string): Promise<void> {
  await apiClient.delete(`/reservations/${id}`)
}
