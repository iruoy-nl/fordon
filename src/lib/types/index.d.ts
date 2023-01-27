import * as O from 'fp-ts/lib/Option';

export interface User {
    uid: string;
    displayName: O.Option<string>;
    email: O.Option<string>;
    photoURL: O.Option<string>;
}