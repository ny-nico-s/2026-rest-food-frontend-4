import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import type { OrderStatus } from '../../../types/order'
import { ORDER_STATUSES, ORDER_STATUS_LABELS } from '../../../types/order'

interface StatusSelectProps {
  value: OrderStatus
  disabled?: boolean
  onChange: (status: OrderStatus) => void
}

export default function StatusSelect({
  value,
  disabled = false,
  onChange,
}: StatusSelectProps) {
  return (
    <FormControl size="small" sx={{ minWidth: 160 }}>
      <Select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value as OrderStatus)}
      >
        {ORDER_STATUSES.map((status) => (
          <MenuItem key={status} value={status}>
            {ORDER_STATUS_LABELS[status]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
