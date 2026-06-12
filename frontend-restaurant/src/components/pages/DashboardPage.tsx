import { useState } from 'react'
import Stack from '@mui/material/Stack'
import SectionTitle from '../atoms/SectionTitle'
import DashboardLogin from '../molecules/DashboardLogin'
import ReservationList from '../organisms/ReservationList'
import MenuManager from '../organisms/MenuManager'
import TableManager from '../organisms/TableManager'

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
      <SectionTitle>Menü</SectionTitle>
      <MenuManager />
      <SectionTitle>Tische</SectionTitle>
      <TableManager />
    </Stack>
  )
}

export default DashboardPage
