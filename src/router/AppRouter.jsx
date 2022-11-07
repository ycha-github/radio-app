import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth';
import { getEnvVariables } from '../helpers';
import { useAuthStore } from '../hooks';
import { RadioPage, RadioRoutes } from '../radio';

export const AppRouter = () => {

  const {status, checkAuthToken} = useAuthStore();

  useEffect(() => {
   checkAuthToken();
  }, [])

  
  if( status === 'checking'){
    return(
      <h3> Cargando...</h3>
    )
  }
  
      //  const authStatus='not-authenticated'//'Authenticated'//'checking';  //;

  return (
    <Routes>
        {
          (status=== 'not-authenticated')
          ?(
            <>
            <Route  path="/auth/*" element={ <AuthRoutes /> } />
            <Route  path="/*" element={ <Navigate to="/auth/login" /> } />
            </>
          )
          :(
            <>
            <Route  path="/radio/*" element={ <RadioPage /> } />
             <Route  path="/*" element={ <Navigate to="/radio/" /> } />
            </>
          )
        }
    </Routes>
  )
}