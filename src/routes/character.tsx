import { createRoute } from "@tanstack/react-router";
import { CharacterDetail } from "../components/CharacterDetail";
import { rootRoute } from "./root";

export const characterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/character/$characterId",
  component: CharacterDetail,
});
