import React from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import UserRegister from '../pages/form/UserRegister'

const AppRoutes = () => {
  return (
    <div>
      <Router>
        <Routes>
            <Route path='/vibe/register/' element = {<UserRegister/>} ></Route>
            <Route path='/vibe/login/' element = {<h1>User Login</h1>} ></Route>
           <Route path='/vibe/admin/register' element = {<h1>Admin Register</h1>} ></Route>
            <Route path='/vibe/admin/login/' element = {<h1>Admin Login</h1>} ></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default AppRoutes
