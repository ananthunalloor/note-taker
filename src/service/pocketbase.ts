import PocketBase from 'pocketbase';
import { useMutation, useQuery } from '@tanstack/react-query';

import {
  BaseAuth,
  Notebook,
  Error,
  Note,
  CreateNote,
  CreateNotebook,
  UpdateNote,
  UpdateNotebook
} from '../types';

const baseURl = import.meta.env.VITE_API_BASE_URL;
export const pb = new PocketBase(baseURl);

export const authenticateUser = ({ username, password }: BaseAuth) => {
  return pb.collection('users').authWithPassword(username, password);
};

export const authRefresh = () => pb.collection('users').authRefresh();
export const logoutUser = () => {
  pb.authStore.clear();
};
export const isUserAuthenticated = () => pb.authStore.isValid || false;

export const authStore = pb.authStore;
export const backendHealthCheck = pb.health.check();

export const useGetAllNotebooks = () => {
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

export const useGetAllNotes = (notebook_id?: string) => {
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

export const useCreateNote = () => {
  const mutation = useMutation<Note, Error, CreateNote>({
    mutationFn: async (data) => await pb.collection('Notes').create(data)
  });
  return mutation;
};

export const useCreateNotebook = () => {
  const mutation = useMutation<Notebook, Error, CreateNotebook>({
    mutationFn: async (data) => await pb.collection('Notebook').create(data)
  });
  return mutation;
};

export const useGetNote = (noteId: string) => {
  const getNote = async (noteId: string): Promise<Note> =>
    await pb.collection('Notes').getOne(noteId);

  const noteQuery = useQuery<unknown, Error, Note, string[]>({
    queryKey: ['note', noteId],
    queryFn: () => getNote(noteId),
    enabled: !!noteId
  });
  return noteQuery;
};

export const useUpdateNote = (noteId: string) => {
  const mutation = useMutation<Note, Error, UpdateNote>({
    mutationFn: async (data) => await pb.collection('Notes').update(noteId, data)
  });
  return mutation;
};

export const useUpdateNotebook = (notebookId: string) => {
  const mutation = useMutation<Notebook, Error, UpdateNotebook>({
    mutationFn: async (data) => await pb.collection('Notebook').update(notebookId, data)
  });
  return mutation;
};
