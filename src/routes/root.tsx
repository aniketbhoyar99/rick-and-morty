import { createRootRoute, Outlet } from "@tanstack/react-router";

export const rootRoute = createRootRoute({
  component: () => (
    <div>
      <header
        style={{
          padding: "20px",
          backgroundColor: "#f5f5f5",
          boxShadow: "0 4px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ margin: 0, textAlign: "center" }}>
          Rick & Morty Characters
        </h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  ),
});
