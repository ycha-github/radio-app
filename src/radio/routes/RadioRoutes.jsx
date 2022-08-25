import { Navigate, Route, Routes } from 'react-router-dom';
import { RadioPage } from '../pages';

export const RadioRoutes = () => {
  return (
    <Routes>

        <Route path="*" element={ <RadioPage /> } />

        <Route path="/*" element={ <Navigate to="/" /> } />

    </Routes>
  )
}