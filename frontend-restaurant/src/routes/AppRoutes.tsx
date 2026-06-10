import { Routes, Route } from 'react-router-dom'

import MainLayout from '../components/templates/MainLayout/MainLayout'
import HomePage from '../pages/HomePage'
import MenuPage from '../pages/MenuPage'
import ReservationPage from '../pages/ReservationPage'
import ReservationsPage from '../pages/ReservationsPage'
import ApiTestPage from '../pages/ApiTestPage'
import { PATHS } from './paths'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={PATHS.home} element={<HomePage />} />
        <Route path={PATHS.menu} element={<MenuPage />} />
        <Route path={PATHS.reservation} element={<ReservationPage />} />
        <Route path={PATHS.reservations} element={<ReservationsPage />} />
        <Route path={PATHS.apiTest} element={<ApiTestPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
