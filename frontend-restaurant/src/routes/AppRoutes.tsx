import { Routes, Route } from 'react-router-dom'

import MainLayout from '../components/templates/MainLayout/MainLayout'
import HomePage from '../pages/HomePage'
import MenuPage from '../pages/MenuPage'
import CartPage from '../pages/CartPage'
import CheckoutPage from '../pages/CheckoutPage'
import { PATHS } from './paths'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={PATHS.home} element={<HomePage />} />
        <Route path={PATHS.menu} element={<MenuPage />} />
        <Route path={PATHS.cart} element={<CartPage />} />
        <Route path={PATHS.checkout} element={<CheckoutPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
