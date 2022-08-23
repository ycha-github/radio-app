import { Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth';
import { RadioRoutes } from '../radio';


export const AppRouter = () => {
  return (
    <Routes>

        {/* Login y Registro */}
        <Route  path="/auth/*" element={ <AuthRoutes /> } />

        {/* JournalApp */}
        <Route  path="/*" element={ <RadioRoutes /> } />

    </Routes>
  )
}
