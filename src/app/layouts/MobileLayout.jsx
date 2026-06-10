import { Outlet, useNavigate, useLocation } from "react-router";
import { Home, Search, Calendar, User } from "lucide-react";

const navItems = [
  { path: "/app", icon: Home, label: "Início", exact: true },
  { path: "/app/buscar", icon: Search, label: "Buscar", exact: false },
  { path: "/app/consultas", icon: Calendar, label: "Consultas", exact: false },
  { path: "/app/perfil", icon: User, label: "Perfil", exact: false },
];

export function MobileLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const isNavActive = (path, exact) =>
    exact ? location.pathname === path : location.pathname.startsWith(path);

  return (
    <div
      className="relative flex items-center justify-center overflow-hidden bg-[#0D1B2A]"
      style={{ width: "100%", height: "100%", minHeight: "100dvh" }}
    >
      <div
        className="relative flex flex-col overflow-hidden bg-background shadow-2xl"
        style={{
          width: "100%",
          maxWidth: 390,
          height: "100%",
          maxHeight: 844,
          fontFamily: "'Nunito', system-ui, sans-serif",
        }}
      >
        {/* Screen content */}
        <div className="flex-1 relative overflow-hidden">
          <div
            className="absolute inset-0 overflow-y-auto overflow-x-hidden"
            style={{ paddingBottom: 80 }}
          >
            <Outlet />
          </div>
        </div>

        {/* Bottom navigation */}
        <div
          className="absolute bottom-0 left-0 right-0 bg-card border-t border-border flex items-stretch"
          style={{ height: 72, paddingBottom: 8 }}
        >
          {navItems.map(({ path, icon: Icon, label, exact }) => {
            const active = isNavActive(path, exact);
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className="flex-1 flex flex-col items-center justify-center gap-1 transition-all"
              >
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-2xl transition-all"
                  style={{ background: active ? "var(--secondary)" : "transparent" }}
                >
                  <Icon
                    className="w-5 h-5 transition-all"
                    style={{ color: active ? "var(--primary)" : "var(--muted-foreground)" }}
                  />
                </div>
                <span
                  style={{
                    fontSize: "0.625rem",
                    fontWeight: active ? 700 : 500,
                    color: active ? "var(--primary)" : "var(--muted-foreground)",
                  }}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
