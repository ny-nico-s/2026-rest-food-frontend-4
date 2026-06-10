import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import PriceTag from '../../atoms/PriceTag/PriceTag'
import StatusBadge from '../../atoms/StatusBadge/StatusBadge'
import type { Order } from '../../../types/order'

interface OrderTableProps {
  orders: Order[]
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

export default function OrderTable({ orders }: OrderTableProps) {
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
