import * as D from "io-ts/lib/Decoder";

export const Failure = D.struct({
  message: D.string,
});

export type Failure = D.TypeOf<typeof Failure>;

export const User = D.struct({
  id: D.string,
  email: D.string,
  name: D.string,
  avatarUrl: D.string,
});

export type User = D.TypeOf<typeof User>;

export const Provider = D.struct({
  name: D.string,
  state: D.string,
  codeVerifier: D.string,
  authUrl: D.string,
});

export type Provider = D.TypeOf<typeof Provider>;

export const PageMeta = D.struct({
  title: D.string,
});

export type PageMeta = D.TypeOf<typeof PageMeta>;
