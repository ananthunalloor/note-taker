import { useLocation, Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../../context';

export const AuthRequired = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return <Navigate to='/login' state={location} replace />;
  return <Outlet />;
};
