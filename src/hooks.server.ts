import { auth } from "$lib/auth"; // path to your auth file
import { svelteKitHandler } from "better-auth/svelte-kit";
import { building } from "$app/environment";
import { redirect } from "@sveltejs/kit";

export async function handle({ event, resolve }) {
  if (event.route.id?.includes("(private)")) {
    const session = await auth.api.getSession({
      headers: event.request.headers,
    });

    if (session) {
      event.locals.session = session?.session;
      event.locals.user = session?.user;

      return svelteKitHandler({ event, resolve, auth, building });
    } else {
      redirect(307, "/auth/login?redirect=" + event.url.pathname + event.url.search);
    }
  } else {
    return svelteKitHandler({ event, resolve, auth, building });
  }
}
