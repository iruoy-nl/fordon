import {InjectionKey} from "vue";

export type Error = {
  message: string;
};

export type Notification = {
  id: number;
  type: "danger" | "warning" | "info" | "success";
  message: string;
};

export type NotificationForm = Omit<Notification, "id">;

export type User = {
  id: string;
  email: string;
  name: string;
  avatarUrl: string;
};

export type Provider = {
  name: string;
  state: string;
  codeVerifier: string;
  authUrl: string;
};

export type PageMeta = {
  title: string | null;
};

export type Vehicle = {
  id: string;
  model: string;
  photo: string | null;
  photoUrl: string | null;
};

export type BaseFormInput = {
  touched: () => boolean;
  touch: () => void;
  isValid: () => boolean;
  error: () => Error | null;
};

export type BaseForm = InjectionKey<{
  register: (input: BaseFormInput) => void;
}>;

export const baseFormKey = Symbol() as BaseForm;