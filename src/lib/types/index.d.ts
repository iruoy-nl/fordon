import * as O from 'fp-ts/lib/Option';

export interface User {
    uid: string;
    photoURL: O.Option<string>;
    email: O.Option<string>;
}