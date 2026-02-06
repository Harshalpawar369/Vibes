import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllItems } from './redux/features/productSlice.js';
import axiosuserapi from "../src/api/axiosuserapi.jsx";
import { useState } from 'react';

const App = () => {

  const [user,setUser] = useState(null);
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [loading,setLoading] = useState(true);

  const dispatch = useDispatch();

  const checkAuth = async () => {
    try{
     const response = await axiosuserapi.get('/loggedIn', {withCredentials:true});
      console.log("Auth response:", response.data);
      if(response.data.loggedIn === true){
        setUser(response.data.user);
        setIsLoggedIn(true);
       
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    } 
    catch(error){
      console.log("Not logged in");
      setUser(null);
      setIsLoggedIn(false);
    }
    finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(fetchAllItems());
    checkAuth();
  }, [dispatch]);

  const handleAuthSuccess = (authedUser) => {
    setUser(authedUser || null);
    setIsLoggedIn(Boolean(authedUser));
  };

 

  if (loading) return <div className="">Checking Vibes...</div>;

  
  return (
    <div className='w-full h-screen bg-zinc-900 text-white '>
    <AppRoutes
      isLoggedIn={isLoggedIn}
      user={user}
      onAuthSuccess={handleAuthSuccess}
    />
    </div>
  )
}

export default App
