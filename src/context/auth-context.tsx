import { useCallback, useEffect, useState, ReactNode, useContext, createContext } from 'react';
import { useInterval } from '@mantine/hooks';
import { AuthModel, RecordAuthResponse, RecordModel } from 'pocketbase';
import { jwtDecode } from 'jwt-decode';

import { BaseAuth } from '../types';
import {
  authRefresh,
  authStore,
  authenticateUser,
  isUserAuthenticated,
  logoutUser
} from '../service';

export interface IAuthInterface {
  token: string | null;
  user: AuthModel | null;
  login: ({ username, password }: BaseAuth) => Promise<RecordAuthResponse<RecordModel>>;
  logout: () => void;
}

export const AuthContext = createContext<IAuthInterface>({} as IAuthInterface);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthModel | null>(null);

  useEffect(() => {
    const handleChange = (token: string, user: AuthModel) => {
      setToken(token);
      setUser(user);
    };

    const unsubscribe = authStore.onChange(handleChange);

    setToken(authStore.token);
    setUser(authStore.model);

    return () => {
      unsubscribe();
    };
  }, []);

  const login = useCallback(authenticateUser, []);
  const logout = useCallback(logoutUser, []);

  const refreshSession = useCallback(() => {
    if (!isUserAuthenticated()) return;

    const payload = token && jwtDecode(token);
    const expiration = (payload && payload.exp) || 0;
    const buffer = (expiration + 5000) / 1000;

    if (expiration < buffer) {
      authRefresh();
    }
  }, [token]);

  const interval = useInterval(refreshSession, 300000);
  useEffect(() => {
    interval.start();
    return interval.stop;
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
