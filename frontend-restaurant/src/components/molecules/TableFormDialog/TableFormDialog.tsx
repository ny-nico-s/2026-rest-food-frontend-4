import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import type { RestaurantTable, TableInput } from '../../../types/reservation'

type TableFormDialogProps = {
  open: boolean
  table: RestaurantTable | null
  saving: boolean
  onClose: () => void
  onSave: (input: TableInput) => void
}

function TableFormDialog({ open, table, saving, onClose, onSave }: TableFormDialogProps) {
  const [numSeats, setNumSeats] = useState(2)
  const [tableNumber, setTableNumber] = useState('')

  useEffect(() => {
    if (open) {
      setNumSeats(table?.numSeats ?? 2)
      setTableNumber(table?.tableNumber != null ? String(table.tableNumber) : '')
    }
  }, [open, table])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onSave({
      numSeats,
      tableNumber: tableNumber === '' ? undefined : Number(tableNumber),
    })
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <Box component="form" onSubmit={handleSubmit}>
        <DialogTitle>{table ? 'Tisch bearbeiten' : 'Tisch hinzufügen'}</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              label="Tischnummer (optional)"
              type="number"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              slotProps={{ htmlInput: { min: 1 } }}
            />
            <TextField
              label="Anzahl Plätze"
              type="number"
              value={numSeats}
              onChange={(e) => setNumSeats(Number(e.target.value))}
              slotProps={{ htmlInput: { min: 1 } }}
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
