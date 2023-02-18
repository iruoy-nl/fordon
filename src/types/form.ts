import type * as E from 'fp-ts/lib/Either';

export class FormValidationError extends Error { }

export interface FormInput {
  touch: () => void;
  isValid: () => boolean;
}

export interface FormInputValidator {
  (input: unknown): E.Either<FormValidationError, void>;
}