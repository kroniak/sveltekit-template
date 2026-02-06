import type { Feature } from "$lib/types/pages";
import { buildFeature } from "$lib/utils/features";

type DashboardPages = "application_dashboard";
export type DashboardRoutes = Feature<DashboardPages>;

const dashboardRoutes: DashboardRoutes = buildFeature({
  pages: {
    application_dashboard: {
      pathTemplate: "/dashboard",
      title: "Dashboard for your work",
      hidePageHeader: true,
    },
  },
});

export default dashboardRoutes;
