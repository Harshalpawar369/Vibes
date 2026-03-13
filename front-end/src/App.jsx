import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllItems } from './redux/features/productSlice.js';
import axiosuserapi from "../src/api/axiosuserapi.jsx";
import { useState } from 'react';
import UserProvider from './context/UserProvider.jsx';

const App = () => {

  
 
  

  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(fetchAllItems());
    
  }, [dispatch]);

 

 



  
  return (
    <UserProvider>
    <div className='w-full h-screen bg-zinc-900 text-white '>

    <AppRoutes
      
    />
    </div>
    </UserProvider>
  )
}

export default App
