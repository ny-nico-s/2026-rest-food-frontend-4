import { useState } from 'react'
import Stack from '@mui/material/Stack'
import SectionTitle from '../components/atoms/SectionTitle/SectionTitle'
import DashboardLogin from '../components/molecules/DashboardLogin/DashboardLogin'
import ReservationList from '../components/organisms/ReservationList/ReservationList'

const DASHBOARD_KEY = 'dashboard_unlocked'

function DashboardPage() {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem(DASHBOARD_KEY) === 'true',
  )

  const handleSuccess = () => {
    sessionStorage.setItem(DASHBOARD_KEY, 'true')
    setUnlocked(true)
  }

  if (!unlocked) {
    return <DashboardLogin onSuccess={handleSuccess} />
  }

  return (
    <Stack spacing={3}>
      <SectionTitle>Reservierungen</SectionTitle>
      <ReservationList />
    </Stack>
  )
}

export default DashboardPage
