import * as t from "io-ts";

export const Failure = t.type({
  message: t.string,
});

export type Failure = t.TypeOf<typeof Failure>;

export const User = t.type({
  id: t.string,
  email: t.string,
  name: t.string,
  avatarUrl: t.string,
});

export type User = t.TypeOf<typeof User>;

export const Provider = t.type({
  name: t.string,
  state: t.string,
  codeVerifier: t.string,
  authUrl: t.string,
});

export type Provider = t.TypeOf<typeof Provider>;
