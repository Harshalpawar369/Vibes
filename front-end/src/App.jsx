
import AppRoutes from './routes/AppRoutes'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllItems } from './redux/features/productSlice.js';
import { HelmetProvider } from 'react-helmet-async';
import UserProvider from './context/UserProvider.jsx';

const App = () => {

  
 
  

  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(fetchAllItems());
    
  }, [dispatch]);

 

 



  
  return (
    <HelmetProvider>
    <UserProvider>
    <div className='w-full h-screen bg-zinc-900 text-white '>

    <AppRoutes
      
    />
    </div>
    </UserProvider>
    </HelmetProvider>
  )
}

export default App
