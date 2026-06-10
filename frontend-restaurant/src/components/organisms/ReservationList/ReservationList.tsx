import { useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { getReservations, deleteReservation } from '../../../api/reservation.api'
import { useFetch } from '../../../hooks/useFetch'
import ReservationCard from '../../molecules/ReservationCard/ReservationCard'

function ReservationList() {
  const { data, loading, error, refetch } = useFetch(getReservations)
  const [cancelingId, setCancelingId] = useState<string | null>(null)
  const [cancelError, setCancelError] = useState('')

  const handleCancel = async (id: string) => {
    setCancelingId(id)
    setCancelError('')
    try {
      await deleteReservation(id)
      refetch()
    } catch (err) {
      setCancelError(
        err instanceof Error
          ? err.message
          : 'Reservierung konnte nicht storniert werden.',
      )
    } finally {
      setCancelingId(null)
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Alert severity="error">
        Reservierungen konnten nicht geladen werden: {error}
      </Alert>
    )
  }

  const reservations = data ?? []

  if (reservations.length === 0) {
    return (
      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
        Es liegen noch keine Reservierungen vor.
      </Typography>
    )
  }

  return (
    <Box>
      {cancelError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {cancelError}
        </Alert>
      )}
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: '1fr 1fr 1fr',
          },
        }}
      >
        {reservations.map((reservation) => (
          <ReservationCard
            key={reservation.id}
            reservation={reservation}
            onCancel={handleCancel}
            canceling={cancelingId === reservation.id}
          />
        ))}
      </Box>
    </Box>
  )
}

export default ReservationList
