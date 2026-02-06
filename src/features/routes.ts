import application, { type ApplicationRoutes } from "$features/application/application-routes";
import dashboard, { type DashboardRoutes } from "$features/dashboard/dashoard-routes";
import accounts, { type AccountsRoutes } from "$features/accounts/accounts-routes";

/**
 * Interface representing the application routes structure.
 * It organizes the routes into different category-based groups
 * for better modularity and management of the application routing system.
 */
export type AppRoutes = Readonly<{
  application: ApplicationRoutes;
  dashboard: DashboardRoutes;
  accounts: AccountsRoutes;
}>;

/**
 * Defines the main routes for the application.
 */
const routes: AppRoutes = {
  application,
  dashboard,
  accounts,
};

export default routes;
