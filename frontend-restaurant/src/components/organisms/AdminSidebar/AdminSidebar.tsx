import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import DashboardIcon from '@mui/icons-material/Dashboard'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import { NavLink } from 'react-router-dom'
import { PATHS } from '../../../routes/paths'

const NAV_ITEMS = [
  { label: 'Dashboard', to: PATHS.admin, icon: <DashboardIcon />, end: true },
  { label: 'Produkte', to: PATHS.adminProducts, icon: <RestaurantMenuIcon />, end: false },
  { label: 'Bestellungen', to: PATHS.adminOrders, icon: <ReceiptLongIcon />, end: false },
]

export default function AdminSidebar() {
  return (
    <Box>
      <Toolbar>
        <Typography variant="h6" noWrap sx={{ fontWeight: 700 }}>
          Admin
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {NAV_ITEMS.map((item) => (
          <ListItemButton
            key={item.to}
            component={NavLink}
            to={item.to}
            end={item.end}
            sx={{
              '&.active': {
                bgcolor: 'action.selected',
                fontWeight: 700,
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  )
}
