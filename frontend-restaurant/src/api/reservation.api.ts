import { apiClient } from './client'
import type {
  Reservation,
  ReservationInput,
  RestaurantTable,
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
}

type BackendTable = {
  id?: string
  tableId?: string
  tableNumber: number
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
  }
}

function toBackendReservation(input: ReservationInput) {
  return {
    start: input.start,
    end: input.end,
    numerOfPeople: input.numberOfPeople,
    reserveeLastName: input.reserveeLastName,
    reserveePhoneNumber: input.reserveePhoneNumber,
  }
}

function toTable(b: BackendTable): RestaurantTable {
  return {
    id: b.tableId ?? b.id ?? '',
    tableNumber: b.tableNumber,
    numSeats: b.numSeats,
  }
}

export async function getTables(): Promise<RestaurantTable[]> {
  const response = await apiClient.get<BackendTable[]>('/tables')
  return response.data.map(toTable)
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
