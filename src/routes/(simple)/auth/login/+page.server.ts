import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ url }) => {
  const redirectUrl = url.searchParams.get("redirect");
  return { redirectUrl };
};
