import { useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { createReservation } from '../../api/reservation.api'
import TablePicker from './TablePicker'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const RESERVATION_HOURS = 2

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!selected || !endDate) return

    if (!tableId) {
      setStatus('error')
      setMessage('Bitte einen Tisch auswählen.')
      return
    }

    if (people < 1 || people > 8) {
      setStatus('error')
      setMessage('Es können maximal 8 Personen reserviert werden.')
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
          slotProps={{ htmlInput: { min: 1, max: 8 } }}
          helperText="Maximal 8 Personen"
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
          start={selected ? toLocalDateTime(selected) : null}
          end={endDate ? toLocalDateTime(endDate) : null}
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
