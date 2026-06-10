import Stack from '@mui/material/Stack'
import SectionTitle from '../components/atoms/SectionTitle/SectionTitle'
import ReservationList from '../components/organisms/ReservationList/ReservationList'

function ReservationsPage() {
  return (
    <Stack spacing={3}>
      <SectionTitle>Reservierungen</SectionTitle>
      <ReservationList />
    </Stack>
  )
}

export default ReservationsPage
