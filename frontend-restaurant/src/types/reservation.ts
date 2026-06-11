export interface RestaurantTable {
  id: string
  numSeats: number
  tableNumber?: number
}

export type TableInput = {
  numSeats: number
  tableNumber?: number
}

export interface Reservation {
  id: string
  start: string
  end: string
  numberOfPeople: number
  reserveeLastName: string
  reserveePhoneNumber: string
  tableIds: string[]
}

export type ReservationInput = Omit<Reservation, 'id'>
