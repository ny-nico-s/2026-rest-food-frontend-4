import { Routes, Route } from 'react-router-dom'

import MainLayout from '../components/templates/MainLayout/MainLayout'
import HomePage from '../pages/HomePage'
import MenuPage from '../pages/MenuPage'
import ApiTestPage from '../pages/ApiTestPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import { PATHS } from './paths'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={PATHS.home} element={<HomePage />} />
        <Route path={PATHS.menu} element={<MenuPage />} />
        <Route path={PATHS.apiTest} element={<ApiTestPage />} />
      </Route>
      <Route path={PATHS.login} element={<LoginPage />} />
      <Route path={PATHS.register} element={<RegisterPage />} />
    </Routes>
  )
}

export default AppRoutes
