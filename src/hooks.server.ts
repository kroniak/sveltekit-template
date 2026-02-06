import { auth } from "$lib/server/auth";
import { svelteKitHandler } from "better-auth/svelte-kit";
import { building } from "$app/environment";
import { redirect } from "@sveltejs/kit";
import routes from "$features/routes";

export async function handle({ event, resolve }) {
  const session = await auth.api.getSession({
    headers: event.request.headers,
  });

  if (session) {
    event.locals.session = session?.session;
    event.locals.user = session?.user;
    return svelteKitHandler({ event, resolve, auth, building });
  } else if (event.route.id?.includes("(private)")) {
    redirect(303, routes.accounts.pages.login.path({ query: { redirect: event.url.pathname } }));
  }

  return svelteKitHandler({ event, resolve, auth, building });
}
