import { RouteProps } from "react-router-dom";

import { AccountPage } from "pages/AccountPage";
import { ForbiddenPage } from "pages/ForbiddenPage";
import { NotAuthorizedPage } from "pages/NotAuthorizedPage";
import { NotificationsPage } from "pages/NotificationsPage";
import { OilProductionForecastPage } from "pages/OilProductionForecastPage";
import WellsAnalyticsPage from "pages/WellsAnalyticsPage/WellsAnalytics";
import { WellsPage } from "pages/WellsPage";

import { LazyLoadChunk } from "components/LazyLoadChunk/LazyLoadChunk";

export type TAppRouteProps = RouteProps & {
  authOnly?: boolean;
  adminOnly?: boolean;
  element: JSX.Element;
};

export enum AppRoutes {
  WELLS = "wells",
  ACCOUNT = "account",
  FORBIDDEN = "forbidden",
  NOT_AUTHORIZED = "not_authorized",
  WELLS_ANALYTICS = "wells_analytics",
  NOTIFICATIONS = "notifications",
  OIL_PRODUCTION_FORECAST = "oil_production_forecast",
}

export const RouterPath: Record<AppRoutes, string> = {
  [AppRoutes.WELLS]: "/",
  [AppRoutes.ACCOUNT]: "/account",
  [AppRoutes.FORBIDDEN]: "/forbidden",
  [AppRoutes.NOT_AUTHORIZED]: "/not_authorized",
  [AppRoutes.WELLS_ANALYTICS]: "/wells_analytics",
  [AppRoutes.NOTIFICATIONS]: "/notifications",
  [AppRoutes.OIL_PRODUCTION_FORECAST]: "/oil_production_forecast",
};

export const routeConfig: Record<AppRoutes, TAppRouteProps> = {
  [AppRoutes.WELLS]: {
    path: RouterPath.wells,
    element: (
      <LazyLoadChunk>
        <WellsPage />
      </LazyLoadChunk>
    ),
    authOnly: true,
  },
  [AppRoutes.ACCOUNT]: {
    path: RouterPath.account,
    element: (
      <LazyLoadChunk>
        <AccountPage />
      </LazyLoadChunk>
    ),
    authOnly: true,
  },
  [AppRoutes.FORBIDDEN]: {
    path: RouterPath.forbidden,
    element: (
      <LazyLoadChunk>
        <ForbiddenPage />
      </LazyLoadChunk>
    ),
    authOnly: true,
  },
  [AppRoutes.NOT_AUTHORIZED]: {
    path: RouterPath.not_authorized,
    element: (
      <LazyLoadChunk>
        <NotAuthorizedPage />
      </LazyLoadChunk>
    ),
  },
  [AppRoutes.WELLS_ANALYTICS]: {
    path: RouterPath.wells_analytics,
    element: (
      <LazyLoadChunk>
        <WellsAnalyticsPage />
      </LazyLoadChunk>
    ),
    authOnly: true,
  },
  [AppRoutes.NOTIFICATIONS]: {
    path: RouterPath.notifications,
    element: <NotificationsPage />,
    authOnly: true,
  },
  [AppRoutes.OIL_PRODUCTION_FORECAST]: {
    path: RouterPath.oil_production_forecast,
    element: (
      <LazyLoadChunk>
        <OilProductionForecastPage />
      </LazyLoadChunk>
    ),
    authOnly: true,
  },
};
