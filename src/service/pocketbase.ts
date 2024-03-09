import PocketBase from 'pocketbase';

import { BaseAuth } from '../types';

const baseURl = import.meta.env.VITE_API_BASE_URL;
export const pb = new PocketBase(baseURl);

export const authenticateUser = ({ username, password }: BaseAuth) => {
  return pb.collection('users').authWithPassword(username, password);
};

export const authRefresh = () => pb.collection('users').authRefresh();
export const logoutUser = () => {
  console.log('logout called');
  pb.authStore.clear();
};
export const isUserAuthenticated = () => pb.authStore.isValid || false;

export const authStore = pb.authStore;
export const backendHealthCheck = await pb.health.check();
