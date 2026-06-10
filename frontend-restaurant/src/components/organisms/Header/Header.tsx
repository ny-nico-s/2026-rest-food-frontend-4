import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import { Link as RouterLink } from 'react-router-dom'

import Logo from '../../atoms/Logo/Logo'
import NavLinks from '../../molecules/NavLinks/NavLinks'
import { PATHS } from '../../../routes/paths'

function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{ bgcolor: 'common.white', color: 'text.primary' }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 2 }}>
          <IconButton
            color="inherit"
            aria-label="Navigation öffnen"
            edge="start"
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { xs: 'inline-flex', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Logo />

          <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 2 }}>
            <NavLinks />
          </Box>

          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </Container>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 240 }} onClick={() => setDrawerOpen(false)}>
          <List>
            <ListItemButton component={RouterLink} to={PATHS.home}>
              <ListItemText primary="Home" />
            </ListItemButton>
            <ListItemButton component={RouterLink} to={PATHS.menu}>
              <ListItemText primary="Menü" />
            </ListItemButton>
            <ListItemButton component={RouterLink} to={PATHS.reservation}>
              <ListItemText primary="Reservieren" />
            </ListItemButton>
            <ListItemButton component={RouterLink} to={PATHS.reservations}>
              <ListItemText primary="Reservierungen" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  )
}

export default Header
