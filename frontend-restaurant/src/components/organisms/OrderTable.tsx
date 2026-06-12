import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import PriceTag from '../atoms/PriceTag'
import StatusBadge from '../atoms/StatusBadge'
import StatusSelect from '../molecules/StatusSelect'
import type { Order, OrderStatus } from '../../types/order'

interface OrderTableProps {
  orders: Order[]
  updatingId?: string | null
  onStatusChange: (order: Order, status: OrderStatus) => void
}

function formatDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }
  return date.toLocaleString('de-DE', {
    dateStyle: 'short',
    timeStyle: 'short',
  })
}

function countItems(order: Order): number {
  return order.items.reduce((sum, item) => sum + item.quantity, 0)
}

export default function OrderTable({
  orders,
  updatingId = null,
  onStatusChange,
}: OrderTableProps) {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Bestellung</TableCell>
            <TableCell>Kunde</TableCell>
            <TableCell>Datum</TableCell>
            <TableCell align="right">Artikel</TableCell>
            <TableCell align="right">Summe</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="right">Status ändern</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} hover>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>{formatDate(order.createdAt)}</TableCell>
              <TableCell align="right">{countItems(order)}</TableCell>
              <TableCell align="right">
                <PriceTag value={order.total} />
              </TableCell>
              <TableCell align="center">
                <StatusBadge status={order.status} />
              </TableCell>
              <TableCell align="right">
                <StatusSelect
                  value={order.status}
                  disabled={updatingId === order.id}
                  onChange={(status) => onStatusChange(order, status)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
