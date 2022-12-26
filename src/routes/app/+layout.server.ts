import type { Section } from "$lib/types";
import { redirect, type ServerLoad } from "@sveltejs/kit";
import { isNone } from "fp-ts/Option";

export const load: ServerLoad = ({ locals, url }) => {
  //
  if (isNone(locals.user)) {
    throw redirect(301, "/login");
  }

  if (url.pathname === "/app") {
    throw redirect(301, "/app/dashboard");
  }

  const user = locals.user.value;
  const avatar = `http://localhost:8090/api/files/users/${user.id}/${user.avatar}`;

  const sections: Section[] = [
    { icon: "speedometer", title: "Overzicht", href: "/app/dashboard" },
    { icon: "signpost", title: "Kilometers", href: "/app/mileage" },
    { icon: "tools", title: "Onderhoud", href: "/app/maintenance" },
    { icon: "card-checklist", title: "Voertuigen", href: "/app/vehicles" },
    { icon: "gear", title: "Instellingen", href: "/app/settings" },
  ];

  return {
    user: { ...user, avatar },
    sections,
  };
};
