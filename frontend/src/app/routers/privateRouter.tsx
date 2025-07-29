import { Navigate, Outlet } from 'react-router-dom';
import { selectIsAuthenticated } from '@/entities/user';
import { useAppSelector } from '@/shared/lib';


export const PrivateRoute = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  
  return(
  <>
    {isAuthenticated ? <Outlet  /> : <Navigate to="/login" />};
  </>
  )
};