import { Routes, Route } from 'react-router-dom'

import MainLayout from '../components/templates/MainLayout/MainLayout'
import HomePage from '../pages/HomePage'
import MenuPage from '../pages/MenuPage'
import ReservationPage from '../pages/ReservationPage'
import ReservationsPage from '../pages/ReservationsPage'
import ApiTestPage from '../pages/ApiTestPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import AdminLayout from '../components/templates/AdminLayout/AdminLayout'
import AdminDashboard from '../pages/AdminDashboard'
import AdminComingSoon from '../pages/AdminComingSoon'
import ProtectedRoute from './ProtectedRoute'
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
      <Route path={PATHS.login} element={<LoginPage />} />
      <Route path={PATHS.register} element={<RegisterPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path={PATHS.admin} element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="*" element={<AdminComingSoon />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default AppRoutes
