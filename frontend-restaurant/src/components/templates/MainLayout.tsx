import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { Outlet } from 'react-router-dom'

import Header from '../organisms/Header'
import Footer from '../organisms/Footer'

/**
 * Template: Grundgerüst jeder Seite.
 * Header oben, Seiteninhalt (Outlet) in der Mitte, Footer unten.
 * Footer bleibt durch flex-Layout immer am unteren Rand.
 */
function MainLayout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />

      <Container component="main" maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
        <Outlet />
      </Container>

      <Footer />
    </Box>
  )
}

export default MainLayout
