import type * as E from 'fp-ts/lib/Either';
import type {InjectionKey} from "vue";

export class FormValidationError extends Error { }

export type FormInput = {
  touched: () => boolean;
  touch: () => void;
  isValid: () => boolean;
};

export type FormInputValidator = (input: unknown) => E.Either<FormValidationError, void>;

export type Form = InjectionKey<{
  register: (input: FormInput) => void;
}>;

export const formKey = Symbol() as Form;