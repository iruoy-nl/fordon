import * as O from 'fp-ts/lib/Option';

export interface User {
    uid: string;
    email: O.Option<string>;
}

export interface Page {
    icon: string;
    title: string;
    href: string;
}