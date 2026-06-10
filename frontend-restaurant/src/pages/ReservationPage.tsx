import Stack from '@mui/material/Stack'
import SectionTitle from '../components/atoms/SectionTitle/SectionTitle'
import ReservationForm from '../components/organisms/ReservationForm/ReservationForm'

function ReservationPage() {
  return (
    <Stack spacing={3}>
      <SectionTitle>Tisch reservieren</SectionTitle>
      <ReservationForm />
    </Stack>
  )
}

export default ReservationPage
