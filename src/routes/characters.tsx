import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root";
import CharactersList from "../components/CharactersList";

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: CharactersList,
});

export const charactersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/page/$page",
  parseParams: (params) => ({
    page: Number(params.page) || 1,
  }),
  component: CharactersList,
});
