import { useState } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import type { RestaurantTable, TableInput } from '../../types/reservation'

const MAX_SEATS = 12

type TableFormDialogProps = {
  open: boolean
  table: RestaurantTable | null
  saving: boolean
  onClose: () => void
  onSave: (input: TableInput) => void
}

function TableFormDialog({ open, table, saving, onClose, onSave }: TableFormDialogProps) {
  const [numSeats, setNumSeats] = useState(() => table?.numSeats ?? 2)
  const [error, setError] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (numSeats < 1 || numSeats > MAX_SEATS) {
      setError(`Ein Tisch kann 1 bis ${MAX_SEATS} Plätze haben.`)
      return
    }
    onSave({ numSeats })
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <Box component="form" onSubmit={handleSubmit}>
        <DialogTitle>{table ? 'Tisch bearbeiten' : 'Tisch hinzufügen'}</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              label="Anzahl Plätze"
              type="number"
              value={numSeats}
              onChange={(e) => setNumSeats(Number(e.target.value))}
              slotProps={{ htmlInput: { min: 1, max: MAX_SEATS } }}
              error={Boolean(error)}
              helperText={error || `Maximal ${MAX_SEATS} Plätze`}
              required
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Abbrechen</Button>
          <Button type="submit" variant="contained" color="error" disabled={saving}>
            {saving ? 'Speichern…' : 'Speichern'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

export default TableFormDialog
