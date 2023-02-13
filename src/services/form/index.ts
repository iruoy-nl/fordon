import * as E from 'fp-ts/lib/Either';
import {constVoid} from "fp-ts/lib/function";
import * as O from 'fp-ts/lib/Option';
import {parse} from '~/services/date';
import type {FormInputValidator} from "~/types";

export function makeString(
  message: string,
): FormInputValidator {
  return (i) => {
    if (typeof i !== 'string' || i.length === 0) {
      return E.left(new Error(message));
    }

    return E.right(constVoid());
  };
}

export function makeNumber(
  message: string,
): FormInputValidator {
  return (i) => {
    if (typeof i !== 'number' || i <= 0) {
      return E.left(new Error(message));
    }

    return E.right(constVoid());
  };
}

export function makeDate(
  message: string,
): FormInputValidator {
  return (i) => {
    if (typeof i !== 'string' || O.isNone(parse(i))) {
      return E.left(new Error(message));
    }

    return E.right(constVoid());
  };
}