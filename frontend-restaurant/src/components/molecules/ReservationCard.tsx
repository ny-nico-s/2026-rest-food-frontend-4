import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import PeopleIcon from '@mui/icons-material/People'
import PhoneIcon from '@mui/icons-material/Phone'
import EventIcon from '@mui/icons-material/Event'
import type { Reservation } from '../../types/reservation'

type ReservationCardProps = {
  reservation: Reservation
  onCancel: (id: string) => void
  canceling: boolean
}

function formatRange(start: string, end: string): string {
  const startDate = new Date(start)
  const endDate = new Date(end)
  const date = startDate.toLocaleDateString('de-DE', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
  const time: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' }
  return `${date}, ${startDate.toLocaleTimeString('de-DE', time)} – ${endDate.toLocaleTimeString('de-DE', time)}`
}

function ReservationCard({ reservation, onCancel, canceling }: ReservationCardProps) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h3" gutterBottom>
          {reservation.reserveeLastName}
        </Typography>
        <Stack spacing={1}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <EventIcon fontSize="small" color="action" />
            <Typography variant="body2">
              {formatRange(reservation.start, reservation.end)}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <PeopleIcon fontSize="small" color="action" />
            <Typography variant="body2">
              {reservation.numberOfPeople} Personen
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <PhoneIcon fontSize="small" color="action" />
            <Typography variant="body2">{reservation.reserveePhoneNumber}</Typography>
          </Stack>
        </Stack>
      </CardContent>
      <CardActions>
        <Button
          color="error"
          size="small"
          disabled={canceling}
          onClick={() => onCancel(reservation.id)}
        >
          {canceling ? 'Wird storniert…' : 'Stornieren'}
        </Button>
      </CardActions>
    </Card>
  )
}

export default ReservationCard
