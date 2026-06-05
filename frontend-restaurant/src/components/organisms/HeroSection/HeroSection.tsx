import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Link as RouterLink } from 'react-router-dom'
import { PATHS } from '../../../routes/paths'
import logo from '../../../assets/logo.png'

function HeroSection() {
  return (
    <Box
      sx={{
        borderRadius: 3,
        px: { xs: 3, md: 8 },
        py: { xs: 8, md: 14 },
        textAlign: 'center',
        color: 'common.white',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url(${logo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Typography variant="h2" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
        Willkommen bei Rest-Food
      </Typography>
      <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
        Frisch gekocht, schnell geliefert.
      </Typography>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ justifyContent: 'center' }}
      >
        <Button
          component={RouterLink}
          to={PATHS.menu}
          variant="contained"
          color="error"
          size="large"
        >
          Zur Speisekarte
        </Button>
      </Stack>
    </Box>
  )
}

export default HeroSection
