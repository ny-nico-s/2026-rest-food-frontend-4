import Chip from '@mui/material/Chip'
import type { OrderStatus } from '../../types/order'
import { ORDER_STATUS_LABELS } from '../../types/order'

type ChipColor = 'default' | 'warning' | 'info' | 'success' | 'error'

const STATUS_COLORS: Record<OrderStatus, ChipColor> = {
  PENDING: 'warning',
  IN_PROGRESS: 'info',
  READY: 'success',
  COMPLETED: 'default',
  CANCELLED: 'error',
}

interface StatusBadgeProps {
  status: OrderStatus
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Chip
      label={ORDER_STATUS_LABELS[status]}
      color={STATUS_COLORS[status]}
      size="small"
    />
  )
}
