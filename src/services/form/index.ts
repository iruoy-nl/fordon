import * as A from 'fp-ts/lib/Array';
import * as E from 'fp-ts/lib/Either';
import {constVoid, pipe} from "fp-ts/lib/function";
import * as O from 'fp-ts/lib/Option';
import {computed, readonly, Ref, ref} from 'vue';
import {parse} from '~/services/date';
import {FormInput, FormInputValidator, FormValidationError} from "~/types";

const inputs = ref<FormInput[]>([]);

export function useForm(
  form: Ref<HTMLFormElement | undefined>,
) {
  inputs.value = [];

  return {
    isValid: computed(() => {
      return pipe(
        inputs.value,
        A.every((a) => a.isValid())
      );
    }),
    submit: () => {
      pipe(
        inputs.value,
        A.map((a) => a.touch())
      )

      return new FormData(form.value);
    },
  };
}

export function useFormField(
  defaultValue?: unknown,
  validator?: FormInputValidator,
) {
  const current = ref<unknown>(defaultValue);

  const error = computed(() => pipe(
    O.fromNullable(validator),
    O.match(
      () => E.right(constVoid()),
      (a) => a(current.value)
    )
  ));

  const touched = ref<boolean>(false);

  inputs.value = pipe(
    inputs.value,
    A.append({
      touch: (): void => {
        touched.value = true;
      },
      isValid: (): boolean => {
        return E.isRight(error.value);
      }
    })
  );

  return {
    current,
    touch: (): void => {
      touched.value = true;
    },
    error: computed(() => {
      if (touched.value && E.isLeft(error.value)) {
        return error.value.left;
      }

      return null;
    }),
  };
}

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