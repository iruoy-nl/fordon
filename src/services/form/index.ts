import * as A from 'fp-ts/lib/Array';
import * as E from 'fp-ts/lib/Either';
import {constVoid, pipe} from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import {computed, Ref, ref} from 'vue';
import {ZodError, ZodType} from 'zod';
import {FormInput} from '~/types';

const inputs = ref<FormInput[]>([]);

export function useForm(
  form: Ref<HTMLFormElement | undefined>
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
    }
  };
}

export function useFormField(
  defaultValue?: unknown,
  validator?: ZodType
) {
  const current = ref<unknown>(defaultValue);

  const error = computed(() => pipe(
    O.fromNullable(validator),
    O.match(
      () => E.right(constVoid()),
      (a) => {
        return pipe(
          E.tryCatch(
            () => a.parse(current.value),
            (b) => {
              const error = b as ZodError;

              return new Error(error.issues.at(0)?.message);
            }
          )
        );
      }
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
    })
  };
}
