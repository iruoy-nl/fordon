import * as E from 'fp-ts/lib/Either';
import {constVoid} from "fp-ts/lib/function";
import type {FormInputValidator} from "~/types";

export function string(
  message: string,
): FormInputValidator {
  return (i) => {
    if (typeof i !== 'string' || i.length === 0) {
      return E.left(new Error(message));
    }

    return E.right(constVoid());
  };
}