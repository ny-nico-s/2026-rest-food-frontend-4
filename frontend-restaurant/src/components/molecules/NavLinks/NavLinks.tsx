import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { PATHS } from '../../../routes/paths'

type NavItem = {
  label: string
  to: string
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', to: PATHS.home },
  { label: 'Menü', to: PATHS.menu },
]

function NavLinks() {
  const { pathname } = useLocation()

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      {NAV_ITEMS.map((item) => (
        <Button
          key={item.to}
          component={RouterLink}
          to={item.to}
          color="inherit"
          sx={{ fontWeight: pathname === item.to ? 700 : 400 }}
        >
          {item.label}
        </Button>
      ))}
    </Box>
  )
}

export default NavLinks
