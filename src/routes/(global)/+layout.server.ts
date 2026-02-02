import { SIDEBAR_COOKIE_KEY } from "$lib/environment";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = ({ cookies }) => {
  const sidebarOpen = cookies.get(SIDEBAR_COOKIE_KEY);

  return {
    sidebarOpen: Boolean(sidebarOpen == "true"),
  };
};
