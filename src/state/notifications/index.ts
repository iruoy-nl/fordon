import * as A from "fp-ts/lib/Array";
import {pipe} from "fp-ts/lib/function";
import {ref} from "vue";
import {Notification, NotificationForm} from "~/types";

/**
 * The notifications that are currently displayed.
 */
export const notifications = ref<Notification[]>([]);

/**
 * Add a notification and clear it after 2 seconds.
 *
 * @param form The notification data.
 */
export const addNotification = (form: NotificationForm): void => {
  const id = Math.random();

  notifications.value = pipe(
    //
    notifications.value,
    (v) => [...v, {...form, id}]
  );

  setTimeout(() => {
    notifications.value = pipe(
      //
      notifications.value,
      A.filter((v) => v.id !== id)
    );
  }, 2 * 1000);
};
