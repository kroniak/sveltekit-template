import routes, { type AppRoutes } from "$features/routes";
import type { Page } from "$lib/types/pages";

/**
 * Find a route by its path in the application routes
 * @param pathname - The current pathname to match
 * @returns The matching page route or null if not found
 */
export const findRouteByPath = (pathname?: string | null): Page | null => {
  if (!pathname) return null;

  // Normalize pathname (remove the trailing slash if it's not the root path)
  const normalizedPathname = pathname === "/" ? pathname : pathname.replace(/\/$/, "");

  // Collect all pages from all features
  const allPages: Page[] = [];
  for (const featureKey of Object.keys(routes) as Array<keyof AppRoutes>) {
    const feature = routes[featureKey];
    for (const pageKey of Object.keys(feature.pages)) {
      allPages.push((feature.pages as Record<string, Page>)[pageKey]);
    }
  }

  // 1. Check for the exact match first (prioritize static routes)
  for (const page of allPages) {
    const normalizedRoutePath =
      page.pathTemplate === "/" ? page.pathTemplate : page.pathTemplate.replace(/\/$/, "");

    if (normalizedRoutePath === normalizedPathname) {
      return page;
    }
  }

  // 2. Check for dynamic path match
  for (const page of allPages) {
    const normalizedRoutePath =
      page.pathTemplate === "/" ? page.pathTemplate : page.pathTemplate.replace(/\/$/, "");

    if (normalizedRoutePath.includes("[")) {
      // Convert path template to regex pattern
      // 1. Escape regex special characters
      // 2. Replace [...slug] (catch-all) with (.+)
      // 3. Replace [param] with ([^/]+)
      const regexPattern = normalizedRoutePath
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        .replace(/\\\[\\\.{3}.*?\\]/g, "(.+)")
        .replace(/\\\[.*?\\]/g, "([^/]+)");

      const pathRegex = new RegExp(`^${regexPattern}$`);

      if (pathRegex.test(normalizedPathname)) {
        return page;
      }
    }
  }

  return null;
};
