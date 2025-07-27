import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./root";
import { indexRoute, charactersRoute } from "./characters";
import { characterRoute } from "./character";

const routeTree = rootRoute.addChildren([
  indexRoute,
  charactersRoute,
  characterRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
