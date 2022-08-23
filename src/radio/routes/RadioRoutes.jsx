import { Navigate, Route, Routes } from 'react-router-dom';
import { RadioPage, RadioPage2 } from '../pages';

export const RadioRoutes = () => {
  return (
    <Routes>

        <Route path="/" element={ <RadioPage /> } />
        <Route path="/" element={ <RadioPage2 /> } />

        <Route path="/*" element={ <Navigate to="/" /> } />

    </Routes>
  )
}
