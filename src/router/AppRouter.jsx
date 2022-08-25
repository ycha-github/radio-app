import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth';
import { RadioRoutes } from '../radio';


export const AppRouter = () => {

        const authStatus='autenticated';  //'not-authenticated';
  return (
    <Routes>
        {
          (authStatus=== 'not-authenticated')
          ?<Route  path="/auth/*" element={ <AuthRoutes /> } />
          :<Route  path="/*" element={ <RadioRoutes /> } />
        }
          <Route  path="/*" element={ <Navigate to="/auth/login" /> } />  
    </Routes>
  )
}
