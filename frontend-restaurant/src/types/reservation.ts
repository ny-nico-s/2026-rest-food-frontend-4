export interface RestaurantTable {
  id: string
  tableNumber: number
  numSeats: number
}

export interface Reservation {
  id: string
  start: string
  end: string
  numberOfPeople: number
  reserveeLastName: string
  reserveePhoneNumber: string
}

export type ReservationInput = Omit<Reservation, 'id'>
