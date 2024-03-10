import PocketBase from 'pocketbase';

import { BaseAuth, Notebook, Error, Note } from '../types';
import { useQuery } from '@tanstack/react-query';

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
export const backendHealthCheck = pb.health.check();

export const getAllNotebooks = () => {
  const getNotebooks = async (): Promise<Notebook[]> =>
    await pb.collection('Notebook').getFullList({
      sort: 'updated'
    });

  const notebookQuery = useQuery<unknown, Error, Notebook[], string[]>({
    queryKey: ['notebooks'],
    queryFn: getNotebooks
  });
  return notebookQuery;
};

export const getAllNotes = () => {
  const getNotes = async (): Promise<Note[]> =>
    await pb.collection('Notes').getFullList({
      sort: 'updated'
    });

  const noteQuery = useQuery<unknown, Error, Note[], string[]>({
    queryKey: ['notes'],
    queryFn: getNotes
  });
  return noteQuery;
};
