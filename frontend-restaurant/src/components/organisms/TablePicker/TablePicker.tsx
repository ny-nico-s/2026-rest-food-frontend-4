import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { RestaurantTable } from '../../../types/reservation'

type TablePickerProps = {
  tables: RestaurantTable[]
  occupied: Set<string>
  selectedId: string
  onSelect: (id: string) => void
}

function TablePicker({ tables, occupied, selectedId, onSelect }: TablePickerProps) {
  const list = [...tables].sort(
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
