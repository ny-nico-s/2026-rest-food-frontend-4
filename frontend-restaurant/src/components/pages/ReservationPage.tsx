import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import SectionTitle from '../atoms/SectionTitle'
import ReservationForm from '../organisms/ReservationForm'
import logo from '../../assets/logo.png'

function ReservationPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 4,
        alignItems: 'stretch',
      }}
    >
      <Stack spacing={3} sx={{ flex: 1 }}>
        <SectionTitle>Tisch reservieren</SectionTitle>
        <ReservationForm />
      </Stack>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Rest-Food"
          sx={{ width: '100%', height: 'auto', objectFit: 'contain' }}
        />
      </Box>
    </Box>
  )
}

export default ReservationPage
