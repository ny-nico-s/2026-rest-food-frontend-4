import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Link as RouterLink } from 'react-router-dom'
import { PATHS } from '../../../routes/paths'

type CartButtonProps = {
  count?: number
}

function CartButton({ count = 0 }: CartButtonProps) {
  return (
    <IconButton
      component={RouterLink}
      to={PATHS.cart}
      color="inherit"
      aria-label={`Warenkorb, ${count} Artikel`}
    >
      <Badge badgeContent={count} color="error">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  )
}

export default CartButton
