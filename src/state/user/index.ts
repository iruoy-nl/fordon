import {pipe} from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import {ref} from 'vue';
import {pb} from '~/di';
import {User} from '~/types';

export const user = ref<O.Option<User>>(O.none);

pb.authStore.onChange((_, model) => {
  user.value = pipe(
    model,
    (m) => m?.export() as User | null,
    O.fromNullable
  );
}, true);
