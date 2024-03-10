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
  created: Date;
  id: string;
  name: string;
  updated: Date;
  user_id: string;
};

export type Note = {
  id: string;
  collectionId: string;
  collectionName: string;
  created: Date;
  updated: Date;
  user_id: string;
  notebook_id: string;
  title: string;
  description: string;
  body: string;
};

export type CreateNote = Pick<Note, 'user_id' | 'notebook_id' | 'title' | 'description'>;
