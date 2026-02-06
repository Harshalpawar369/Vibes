import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import UserRegister from '../pages/form/UserRegister'
import UserLogin from '../pages/form/UserLogin'
import AdminRegister from '../pages/form/AdminRegister'
import Home from '../pages/views/Home'
import Shop from '../pages/views/Shop'
import About from '../pages/views/About'
import Cart from '../pages/views/Cart'
import AppLayout from './routeLayouts/AppLayout'
import AuthLayout from './routeLayouts/AuthLayout'

const AppRoutes = ({ isLoggedIn, user, onAuthSuccess }) => {
  return (
    <Router>
      <Routes>

        <Route element={<AuthLayout />}>
          <Route
            path='/vibe/login'
            element={<UserLogin onAuthSuccess={onAuthSuccess} />}
          />
          <Route
            path='/vibe/register'
            element={<UserRegister onAuthSuccess={onAuthSuccess} />}
          />
          <Route path='/vibe/admin/login' element={<h1>Admin Login</h1>} />
          <Route path='/vibe/admin/register' element={<AdminRegister />} />
        </Route>

        <Route element={<AppLayout isLoggedIn={isLoggedIn} user={user} />}>
          <Route path='/' element={<Home isLoggedIn={isLoggedIn} user={user}/>} />
          <Route path='/shop' element={<Shop isLoggedIn={isLoggedIn} user={user} />} />
          <Route path='/cart' element={<Cart isLoggedIn={isLoggedIn} user={user}/>} />
          <Route path='/about' element={<About />} />
        </Route>

        <Route path='*' element={<Navigate to='/' replace />} />

      </Routes>
    </Router>
  )
}

export default AppRoutes
