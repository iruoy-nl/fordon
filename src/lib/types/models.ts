export type Failure = {
  message: string;
};

export type User = {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
};

export type Vehicle = {
  id: string;
  model: string;
  avatar?: string;
};
