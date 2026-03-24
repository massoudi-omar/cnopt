import "react-router-dom";

declare module "react-router-dom" {
  interface RouteObject {
    handle?: {
      title?: string;
    };
  }

  interface AgnosticRouteObject {
    handle?: {
      title?: string;
    };
  }
}
