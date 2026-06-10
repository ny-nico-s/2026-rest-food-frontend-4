import { useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { createReservation } from '../../../api/reservation.api'

type Status = 'idle' | 'submitting' | 'success' | 'error'

function ReservationForm() {
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [people, setPeople] = useState(2)
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (new Date(end) <= new Date(start)) {
      setStatus('error')
      setMessage('Das Ende muss nach dem Beginn liegen.')
      return
    }

    setStatus('submitting')
    setMessage('')
    try {
      await createReservation({
        reserveeLastName: lastName,
        reserveePhoneNumber: phone,
        numberOfPeople: people,
        start: new Date(start).toISOString(),
        end: new Date(end).toISOString(),
      })
      setStatus('success')
      setMessage(`Reservierung für ${lastName} bestätigt.`)
      setLastName('')
      setPhone('')
      setPeople(2)
      setStart('')
      setEnd('')
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
          slotProps={{ htmlInput: { min: 1 } }}
          required
        />
        <TextField
          label="Beginn"
          type="datetime-local"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
          required
        />
        <TextField
          label="Ende"
          type="datetime-local"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
          required
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
