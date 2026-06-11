import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { getTables, getReservations } from '../../../api/reservation.api'
import { useFetch } from '../../../hooks/useFetch'

type TablePickerProps = {
  start: string | null
  end: string | null
  selectedId: string
  onSelect: (id: string) => void
}

function TablePicker({ start, end, selectedId, onSelect }: TablePickerProps) {
  const { data: tables, loading, error } = useFetch(getTables)
  const { data: reservations } = useFetch(getReservations)

  const occupied = new Set<string>()
  if (start && end && reservations) {
    const s = new Date(start).getTime()
    const e = new Date(end).getTime()
    for (const reservation of reservations) {
      const rs = new Date(reservation.start).getTime()
      const re = new Date(reservation.end).getTime()
      if (s < re && rs < e) {
        reservation.tableIds.forEach((id) => occupied.add(id))
      }
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return <Alert severity="error">Tische konnten nicht geladen werden: {error}</Alert>
  }

  const list = [...(tables ?? [])].sort(
    (a, b) =>
      (a.tableNumber ?? Number.MAX_SAFE_INTEGER) -
        (b.tableNumber ?? Number.MAX_SAFE_INTEGER) || a.id.localeCompare(b.id),
  )

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Tisch wählen (grün = frei, rot = belegt)
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gap: 1.5,
          gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr 1fr 1fr' },
        }}
      >
        {list.map((table, index) => {
          const isOccupied = occupied.has(table.id)
          const isSelected = selectedId === table.id
          return (
            <Box
              key={table.id}
              role="button"
              aria-disabled={isOccupied}
              onClick={() => {
                if (!isOccupied) onSelect(table.id)
              }}
              sx={{
                p: 1.5,
                borderRadius: 2,
                textAlign: 'center',
                color: 'common.white',
                cursor: isOccupied ? 'not-allowed' : 'pointer',
                bgcolor: isOccupied ? 'error.main' : 'success.main',
                opacity: isOccupied ? 0.75 : 1,
                border: '3px solid',
                borderColor: isSelected ? 'text.primary' : 'transparent',
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Tisch {table.tableNumber ?? index + 1}
              </Typography>
              <Typography variant="body2">{table.numSeats} Plätze</Typography>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default TablePicker
