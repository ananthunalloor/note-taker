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
