export type BaseAuth = {
  username: string;
  password: string;
};

export type Error = {
  code: number;
  message: string;
  data: Data;
};

export type Data = {};

export type Notebook = {
  collectionId: string;
  collectionName: string;
  created: string;
  id: string;
  name: string;
  updated: string;
  user_id: string;
};

export type Note = {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  user_id: string;
  notebook_id: string;
  title: string;
  description: string;
  body?: string;
};

export type CreateNote = Pick<Note, 'user_id' | 'notebook_id' | 'title' | 'description'>;
export type CreateNotebook = Pick<Notebook, 'user_id' | 'name'>;

export type UpdateNote = Pick<Note, 'title' | 'description' | 'body' | 'user_id' | 'notebook_id'>;
export type UpdateNotebook = Pick<Notebook, 'name' | 'user_id'>;
