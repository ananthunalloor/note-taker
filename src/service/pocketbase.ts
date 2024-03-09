import PocketBase from 'pocketbase';

import { BaseAuth } from '../types';

const baseURl = 'http://localhost:3000/api/v1/';
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
