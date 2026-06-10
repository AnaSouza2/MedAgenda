import { Outlet } from "react-router";

export function FullPageLayout() {
  return (
    <div
      className="w-full min-h-screen bg-background overflow-hidden"
      style={{ fontFamily: "'Nunito', system-ui, sans-serif" }}
    >
      <Outlet />
    </div>
  );
}
