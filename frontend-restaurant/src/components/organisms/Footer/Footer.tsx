import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import { Link as RouterLink } from 'react-router-dom'

import { PATHS } from '../../../routes/paths'

/**
 * Organism: Seitenfuß mit Kurzinfos und Navigation.
 */
function Footer() {
  const year = new Date().getFullYear()

  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 4,
        bgcolor: 'grey.900',
        color: 'grey.100',
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Rest-Food
            </Typography>
            <Typography variant="body2" sx={{ color: 'grey.400' }}>
              Frisch gekocht, schnell geliefert.
            </Typography>
          </Box>

          <Stack direction="row" spacing={3}>
            <Link component={RouterLink} to={PATHS.home} color="inherit" underline="hover">
              Home
            </Link>
            <Link component={RouterLink} to={PATHS.menu} color="inherit" underline="hover">
              Menü
            </Link>
          </Stack>
        </Stack>

        <Typography variant="caption" color="grey.500" sx={{ display: 'block', mt: 3 }}>
          © {year} Rest-Food. Alle Rechte vorbehalten.
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer
