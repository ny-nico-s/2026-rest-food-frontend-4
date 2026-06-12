import { useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import {
  createReservation,
  getTables,
  getReservations,
} from '../../api/reservation.api'
import { useFetch } from '../../hooks/useFetch'
import TablePicker from './TablePicker'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const RESERVATION_HOURS = 2
const MAX_PEOPLE = 8

function pad(value: number): string {
  return String(value).padStart(2, '0')
}

function toLocalDateTime(date: Date): string {
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    `T${pad(date.getHours())}:${pad(date.getMinutes())}:00`
  )
}

function ReservationForm() {
  const { data: tables } = useFetch(getTables)
  const { data: reservations, refetch: refetchReservations } = useFetch(getReservations)

  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [people, setPeople] = useState(2)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [tableId, setTableId] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  const selected = date && time ? new Date(`${date}T${time}`) : null
  const endDate = selected
    ? new Date(selected.getTime() + RESERVATION_HOURS * 60 * 60 * 1000)
    : null

  const preview = selected
    ? `${selected.toLocaleDateString('de-DE', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })} um ${selected.toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
      })} Uhr`
    : ''

  const occupied = new Set<string>()
  if (selected && endDate && reservations) {
    const s = selected.getTime()
    const e = endDate.getTime()
    for (const reservation of reservations) {
      const rs = new Date(reservation.start).getTime()
      const re = new Date(reservation.end).getTime()
      if (s < re && rs < e) {
        reservation.tableIds.forEach((id) => occupied.add(id))
      }
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!selected || !endDate) return

    if (people < 1 || people > MAX_PEOPLE) {
      setStatus('error')
      setMessage(`Es können maximal ${MAX_PEOPLE} Personen reserviert werden.`)
      return
    }

    if (!tableId) {
      setStatus('error')
      setMessage('Bitte einen Tisch auswählen.')
      return
    }

    if (occupied.has(tableId)) {
      setStatus('error')
      setMessage('Dieser Tisch ist zur gewählten Zeit bereits belegt.')
      return
    }

    setStatus('submitting')
    setMessage('')
    try {
      await createReservation({
        reserveeLastName: lastName,
        reserveePhoneNumber: phone,
        numberOfPeople: people,
        start: toLocalDateTime(selected),
        end: toLocalDateTime(endDate),
        tableIds: [tableId],
      })
      setStatus('success')
      setMessage(`Reservierung für ${lastName} bestätigt.`)
      setLastName('')
      setPhone('')
      setPeople(2)
      setDate('')
      setTime('')
      setTableId('')
      refetchReservations()
    } catch (err) {
      setStatus('error')
      setMessage(
        err instanceof Error
          ? err.message
          : 'Reservierung konnte nicht gespeichert werden.',
      )
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 480 }}>
      <Stack spacing={3}>
        {status === 'success' && <Alert severity="success">{message}</Alert>}
        {status === 'error' && <Alert severity="error">{message}</Alert>}

        <TextField
          label="Nachname"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <TextField
          label="Telefonnummer"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <TextField
          label="Anzahl Personen"
          type="number"
          value={people}
          onChange={(e) => setPeople(Number(e.target.value))}
          slotProps={{ htmlInput: { min: 1, max: MAX_PEOPLE } }}
          helperText={`Maximal ${MAX_PEOPLE} Personen`}
          required
        />
        <TextField
          label="Datum"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
          required
        />
        <TextField
          label="Uhrzeit"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          slotProps={{ inputLabel: { shrink: true }, htmlInput: { step: 1800 } }}
          required
        />

        {preview && (
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Reservierung am {preview}
          </Typography>
        )}

        <TablePicker
          tables={tables ?? []}
          occupied={occupied}
          selectedId={tableId}
          onSelect={setTableId}
        />

        <Button
          type="submit"
          variant="contained"
          color="error"
          size="large"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Wird gesendet…' : 'Tisch reservieren'}
        </Button>
      </Stack>
    </Box>
  )
}

export default ReservationForm
