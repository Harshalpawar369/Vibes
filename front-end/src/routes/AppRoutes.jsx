import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useContext } from 'react'


import AppLayout from './routeLayouts/AppLayout'
import AuthLayout from './routeLayouts/AuthLayout'
import UserContext from '../context/UserContext'

const AppRoutes = () => {

  const Shop = lazy(() => import('../pages/views/Shop.jsx'));
const AdminPanel = lazy(() => import('../pages/views/AdminPanel.jsx'));
  const About = lazy(() => import('../pages/views/About.jsx'));
    const Cart = lazy(() => import('../pages/views/Cart.jsx'));
    const Home = lazy(() => import('../pages/views/Home.jsx'));
  const UserLogin = lazy(() => import('../pages/form/UserLogin'));
const UserRegister = lazy(() => import('../pages/form/UserRegister'));
const AdminLogin = lazy(() => import('../pages/form/AdminLogin'));
const AdminRegister = lazy(() => import('../pages/form/AdminRegister'));

  const { handleAuthSuccess } = useContext(UserContext)

  const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-400 border-t-transparent"></div>
  </div>
);

  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
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
      </Suspense>
    </Router>
  )
}

export default AppRoutes
