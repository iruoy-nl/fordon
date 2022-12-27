export interface Section {
  icon: string;
  title: string;
  href: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
}

export interface Vehicle {
  id: string;
  model: string;
  avatar?: string;
}
