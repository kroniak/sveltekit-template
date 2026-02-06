import { IconAlertTriangle, IconLink, IconLogin, IconShield, IconUser } from "@tabler/icons-svelte";
import type { Feature } from "$lib/types/pages";
import { buildFeature } from "$lib/utils/features";

type AccountsPages = "login" | "profile" | "connections" | "security" | "danger";
export type AccountsRoutes = Feature<AccountsPages>;

const accountsRoutes: AccountsRoutes = buildFeature({
  pages: {
    login: {
      pathTemplate: "/auth/login",
      icon: IconLogin,
      title: "Login",
    },
    profile: {
      pathTemplate: "/user/profile",
      icon: IconUser,
      title: "Profile",
    },
    connections: {
      pathTemplate: "/user/connections",
      icon: IconLink,
      title: "Connections",
    },
    security: {
      pathTemplate: "/user/security",
      icon: IconShield,
      title: "Security",
    },
    danger: {
      pathTemplate: "/user/danger",
      icon: IconAlertTriangle,
      title: "Danger Zone",
    },
  },
});

export default accountsRoutes;
