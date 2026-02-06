import { IconHome } from "@tabler/icons-svelte";
import type { Feature } from "$lib/types/pages";
import { buildFeature } from "$lib/utils/features";

type ApplicationPages = "home";
export type ApplicationRoutes = Feature<ApplicationPages>;

const applicationRoutes: ApplicationRoutes = buildFeature({
  pages: {
    home: {
      pathTemplate: "/",
      icon: IconHome,
      title: "Assistant Home",
      hidePageHeader: true,
    },
  },
});

export default applicationRoutes;
