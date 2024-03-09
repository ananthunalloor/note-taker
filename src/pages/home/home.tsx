import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../context';
import { useCallback } from 'react';

export const Home = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = useCallback(() => {
    logout();
    navigate('/login');
  }, [logout, navigate]);
  return (
    <div>
      Home <button onClick={onLogout}>logout</button>
    </div>
  );
};
