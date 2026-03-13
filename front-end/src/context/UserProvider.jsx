import React, { useEffect, useState } from 'react'
import UserContext from './UserContext'
import axiosuserapi from '../api/axiosuserapi.jsx'

function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [, setLoading] = useState(true)

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
    checkAuth();
  }, [])

   const handleAuthSuccess = (authedUser) => {
    setUser(authedUser || null);
    setIsLoggedIn(Boolean(authedUser));
  };
  
  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn, handleAuthSuccess }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
