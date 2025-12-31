"use client";

import { usePathname } from "next/navigation";

export default function useActiveRoute() {
  const pathname = usePathname() || "/";

  // Split pathname and get last segment
  const segments = pathname.split("/").filter(Boolean);
  const lastRoute = segments.length ? `/${segments.at(-1)}` : "/";

  /**
   * Check if lastRoute exists in the provided array
   * @param routes string[] - array of routes to check against lastRoute
   */
  const isRouteExist = (routes: string[]) => {
    return routes.includes(lastRoute);
  };

  /**
   * Check if lastRoute matches the given route
   * @param route string - route to check
   */
  const isActive = (route: string) => {
    return lastRoute === route;
  };

  return {
    pathname,
    lastRoute,
    isRouteExist,
    isActive,
  };
}
//const { lastRoute, isRouteExist, isActive } = useActiveRoute();
//isRouteExist(["/123", "/456"]);
//isActive("/123");
