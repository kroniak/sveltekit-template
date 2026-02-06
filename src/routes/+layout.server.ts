import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = ({ locals }) => {
  const { session, user } = locals;

  return {
    session,
    user,
  };
};
