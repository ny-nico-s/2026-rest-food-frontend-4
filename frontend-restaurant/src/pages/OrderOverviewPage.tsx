import { useMemo, useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Snackbar from '@mui/material/Snackbar'
import Typography from '@mui/material/Typography'
import OrderTable from '../components/organisms/OrderTable/OrderTable'
import { useFetch } from '../hooks/useFetch'
import { getOrders, updateOrderStatus } from '../api/orders.api'
import { ORDER_STATUSES, ORDER_STATUS_LABELS } from '../types/order'
import type { Order, OrderStatus } from '../types/order'

type StatusFilter = OrderStatus | 'ALL'

export default function OrderOverviewPage() {
  const { data, loading, error } = useFetch(getOrders)
  const [filter, setFilter] = useState<StatusFilter>('ALL')
  const [overrides, setOverrides] = useState<Record<string, OrderStatus>>({})
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const orders = useMemo(() => {
    if (!data) {
      return []
    }
    return data.map((order) =>
      overrides[order.id]
        ? { ...order, status: overrides[order.id] }
        : order,
    )
  }, [data, overrides])

  const filtered = useMemo(() => {
    if (filter === 'ALL') {
      return orders
    }
    return orders.filter((order) => order.status === filter)
  }, [orders, filter])

  async function handleStatusChange(order: Order, status: OrderStatus) {
    if (order.status === status) {
      return
    }
    setUpdatingId(order.id)
    setOverrides((prev) => ({ ...prev, [order.id]: status }))
    try {
      await updateOrderStatus(order.id, status)
      setMessage('Status aktualisiert.')
    } catch {
      setOverrides((prev) => {
        const next = { ...prev }
        delete next[order.id]
        return next
      })
      setMessage('Status konnte nicht geändert werden.')
    } finally {
      setUpdatingId(null)
    }
  }

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
      {filtered.length > 0 && (
        <OrderTable
          orders={filtered}
          updatingId={updatingId}
          onStatusChange={handleStatusChange}
        />
      )}

      <Snackbar
        open={message !== null}
        autoHideDuration={4000}
        onClose={() => setMessage(null)}
        message={message ?? ''}
      />
    </Box>
  )
}
