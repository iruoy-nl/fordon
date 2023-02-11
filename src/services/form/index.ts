import * as D from 'io-ts/lib/Decoder';

export function makeDecodeString(
  message: string,
): D.Decoder<unknown, unknown> {
  return {
    decode: (i) => {
      if (typeof i !== 'string' || i.length === 0) {
        return D.failure(i, message);
      }

      return D.success(null);
    },
  };
}

export function getMessage(
  e: D.DecodeError,
): string {
  switch (e._tag) {
    case 'Of':
      switch (e.value._tag) {
        case 'Leaf':
          return e.value.error;
      }
  }

  return '';
}