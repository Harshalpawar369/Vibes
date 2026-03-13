import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useContext } from 'react'

import UserRegister from '../pages/form/UserRegister'
import UserLogin from '../pages/form/UserLogin'
import AdminRegister from '../pages/form/AdminRegister'
import Home from '../pages/views/Home'
import Shop from '../pages/views/Shop'
import About from '../pages/views/About'
import Cart from '../pages/views/Cart'
import AppLayout from './routeLayouts/AppLayout'
import AuthLayout from './routeLayouts/AuthLayout'
import AdminLogin from '../pages/form/AdminLogin'
import AdminPanel from "../pages/views/AdminPanel.jsx"
import UserContext from '../context/UserContext'

const AppRoutes = () => {
  const { handleAuthSuccess } = useContext(UserContext)

  return (
    <Router>
      <Routes>

        <Route element={<AuthLayout />}>
          <Route
            path='/vibe/login'
            element={<UserLogin onAuthSuccess={handleAuthSuccess} />}
          />
          <Route
            path='/vibe/register'
            element={<UserRegister onAuthSuccess={handleAuthSuccess} />}
          />
          <Route path='/vibe/admin/login' element={<AdminLogin/>} />
          <Route path='/vibe/admin/register' element={<AdminRegister />} />
          <Route path="/vibe/adminpanel"  element= {<AdminPanel/>}/>
        </Route>

        <Route element={<AppLayout  />}>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/about' element={<About />} />
        </Route>

        <Route path='*' element={<Navigate to='/' replace />} />

      </Routes>
    </Router>
  )
}

export default AppRoutes
