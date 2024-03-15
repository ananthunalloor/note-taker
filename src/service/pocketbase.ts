import PocketBase from 'pocketbase';

import { BaseAuth, Notebook, Error, Note, CreateNote } from '../types';
import { useMutation, useQuery } from '@tanstack/react-query';

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

export const getAllNotes = (notebook_id?: string) => {
  console.log('notebook_id', notebook_id);
  const getNotes = async (notebook_id?: string): Promise<Note[]> =>
    await pb.collection('Notes').getFullList({
      sort: 'updated',
      query: {
        notebook_id
      }
    });

  const noteQuery = useQuery<unknown, Error, Note[], string[]>({
    queryKey: ['notes', `notes-${notebook_id}`],
    queryFn: () => getNotes(notebook_id),
    enabled: !!notebook_id
  });
  return noteQuery;
};

export const createNote = (data: CreateNote) => {
  const mutation = useMutation<Note, Error, CreateNote>({
    mutationFn: async (data: CreateNote) => await pb.collection('Notes').create(data),
    onError: () => console.log('error saving the item === '),

    onSuccess: () => console.log('successful save of item ', data)
  });
  return mutation;
};
