import { useMemo, useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import OrderTable from '../components/organisms/OrderTable/OrderTable'
import { useFetch } from '../hooks/useFetch'
import { getOrders } from '../api/orders.api'
import { ORDER_STATUSES, ORDER_STATUS_LABELS } from '../types/order'
import type { OrderStatus } from '../types/order'

type StatusFilter = OrderStatus | 'ALL'

export default function OrderOverviewPage() {
  const { data, loading, error } = useFetch(getOrders)
  const [filter, setFilter] = useState<StatusFilter>('ALL')

  const filtered = useMemo(() => {
    if (!data) {
      return []
    }
    if (filter === 'ALL') {
      return data
    }
    return data.filter((order) => order.status === filter)
  }, [data, filter])

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h4">Bestellübersicht</Typography>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel id="status-filter-label">Status</InputLabel>
          <Select
            labelId="status-filter-label"
            label="Status"
            value={filter}
            onChange={(e) => setFilter(e.target.value as StatusFilter)}
          >
            <MenuItem value="ALL">Alle</MenuItem>
            {ORDER_STATUSES.map((status) => (
              <MenuItem key={status} value={status}>
                {ORDER_STATUS_LABELS[status]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Alert severity="error">Konnte die Bestellungen nicht laden: {error}</Alert>
      )}
      {data && filtered.length === 0 && (
        <Alert severity="info">Keine Bestellungen vorhanden.</Alert>
      )}
      {filtered.length > 0 && <OrderTable orders={filtered} />}
    </Box>
  )
}
