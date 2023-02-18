import {constVoid, pipe} from "fp-ts/lib/function";
import * as TE from "fp-ts/lib/TaskEither";
import {ClientResponseError} from "pocketbase";
import {ref} from "vue";
import {pb, redirectUrl} from "~/di";
import {getItem, putItem} from "~/services/storage";
import {Provider} from "~/types";

export const providers = ref<Provider[]>([]);

export function getAllProviders(): TE.TaskEither<Error, void> {
  return pipe(
    TE.tryCatch(
      () => pb.collection("users").listAuthMethods(),
      (a) => {
        const error = a as ClientResponseError;

        return new Error(error.message);
      },
    ),
    TE.map((b) => {
      // Set the state
      providers.value = b.authProviders;
    })
  );
};

export function challenge(
  provider: Provider,
): void {
  // We need this when we verify.
  putItem("provider", provider);

  window.location.href = `${provider.authUrl}${redirectUrl}`;
};

export function verify(
  code: string,
  state: string
): TE.TaskEither<Error, void> {
  const provider = getItem<Provider>("provider");

  return pipe(
    provider,
    TE.fromOption(() => new Error('Het authenticatieproces is nog niet gestart.')),
    TE.chain((provider) => {
      return pipe(
        provider.state,
        TE.fromPredicate(
          (v) => v === state,
          () => new Error(`De communicatie met ${provider.name} is mislukt.`),
        ),
        TE.chain(() => {
          const {name, codeVerifier} = provider;

          return pipe(
            TE.tryCatch(
              () =>
                pb //
                  .collection("users")
                  .authWithOAuth2(name, code, codeVerifier, redirectUrl),
              () => new Error('Er is een onbekende fout opgetreden.'),
            ),
            TE.chain((u) => {
              const name = u.meta?.name;
              const avatarUrl = u.meta?.avatarUrl;

              return pipe(
                TE.tryCatch(
                  () =>
                    pb //
                      .collection("users")
                      .update(u.record.id, {name, avatarUrl}),
                  () => new Error('Er is iets misgegaan tijdens het wijzigen van de profielgegevens.'),
                ),
                TE.map(constVoid),
              );
            })
          );
        })
      );
    })
  );
};

export function clear(): void {
  pb.authStore.clear();
};
