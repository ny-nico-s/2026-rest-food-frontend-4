import { Routes, Route } from 'react-router-dom'

import MainLayout from '../components/templates/MainLayout'
import HomePage from '../components/pages/HomePage'
import MenuPage from '../components/pages/MenuPage'
import ReservationPage from '../components/pages/ReservationPage'
import DashboardPage from '../components/pages/DashboardPage'
import ApiTestPage from '../components/pages/ApiTestPage'
import LoginPage from '../components/pages/LoginPage'
import RegisterPage from '../components/pages/RegisterPage'
import AdminLayout from '../components/templates/AdminLayout'
import AdminDashboard from '../components/pages/AdminDashboard'
import AdminComingSoon from '../components/pages/AdminComingSoon'
import ProductManagementPage from '../components/pages/ProductManagementPage'
import OrderOverviewPage from '../components/pages/OrderOverviewPage'
import ProtectedRoute from './ProtectedRoute'
import { PATHS } from './paths'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={PATHS.home} element={<HomePage />} />
        <Route path={PATHS.menu} element={<MenuPage />} />
        <Route path={PATHS.reservation} element={<ReservationPage />} />
        <Route path={PATHS.dashboard} element={<DashboardPage />} />
        <Route path={PATHS.apiTest} element={<ApiTestPage />} />
      </Route>
      <Route path={PATHS.login} element={<LoginPage />} />
      <Route path={PATHS.register} element={<RegisterPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path={PATHS.admin} element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<ProductManagementPage />} />
          <Route path="orders" element={<OrderOverviewPage />} />
          <Route path="*" element={<AdminComingSoon />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default AppRoutes
