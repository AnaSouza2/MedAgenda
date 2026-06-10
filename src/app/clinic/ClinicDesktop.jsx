import { useState } from "react";
import { useNavigate } from "react-router";
import {
  LayoutDashboard, Calendar, Users, BarChart2, Settings,
  Bell, Search, ChevronDown, LogOut,
} from "lucide-react";
import { DashboardSection } from "./sections/DashboardSection";
import { AnalyticsSection } from "./sections/AnalyticsSection";
import { PatientsSection } from "./sections/PatientsSection";
import { ScheduleSection } from "./sections/ScheduleSection";
import { SettingsSection } from "./sections/SettingsSection";
import { clinicRoutes } from "./data/clinicData";

const navItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "analytics", icon: BarChart2, label: "Análise" },
  { id: "patients",  icon: Users, label: "Pacientes" },
  { id: "schedule",  icon: Calendar, label: "Agenda" },
  { id: "settings",  icon: Settings, label: "Configurações" },
];

export function ClinicDesktop({ defaultSection = "dashboard" }) {
  const navigate = useNavigate();
  const [section, setSection] = useState(defaultSection);
  const [collapsed, setCollapsed] = useState(false);

  const handleSectionChange = (id) => {
    setSection(id);
    navigate(clinicRoutes[id] ?? "/clinica");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside
        className="flex flex-col bg-primary transition-all duration-300 flex-shrink-0"
        style={{ width: collapsed ? 72 : 240 }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10" style={{ height: 72 }}>
          <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
            <span style={{ fontSize: "1.25rem" }}>❤️</span>
          </div>
          {!collapsed && (
            <div>
              <p className="text-white" style={{ fontWeight: 800, fontSize: "1.0625rem", lineHeight: 1.2 }}>MedAgenda</p>
              <p className="text-white/50" style={{ fontSize: "0.6875rem" }}>Painel da Clínica</p>
            </div>
          )}
        </div>

        {/* Clinic info */}
        {!collapsed && (
          <div className="mx-3 mt-4 bg-white/10 rounded-xl px-3 py-3">
            <p className="text-white/60" style={{ fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Clínica</p>
            <p className="text-white" style={{ fontWeight: 700, fontSize: "0.875rem", marginTop: 2 }}>Saúde Total</p>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-white/60" style={{ fontSize: "0.75rem" }}>Online · Seg–Sex</span>
            </div>
          </div>
        )}

        {/* Nav items */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {navItems.map(({ id, icon: Icon, label }) => {
            const active = section === id;
            return (
              <button
                key={id}
                onClick={() => handleSectionChange(id)}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all hover:bg-white/10"
                style={{ background: active ? "rgba(255,255,255,0.15)" : "transparent" }}
              >
                <Icon className="w-5 h-5 flex-shrink-0" style={{ color: active ? "white" : "rgba(255,255,255,0.55)" }} />
                {!collapsed && (
                  <span style={{ fontWeight: active ? 700 : 500, fontSize: "0.9375rem", color: active ? "white" : "rgba(255,255,255,0.55)", whiteSpace: "nowrap" }}>
                    {label}
                  </span>
                )}
                {active && !collapsed && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-white/10 space-y-1">
          <button
            onClick={() => setCollapsed(c => !c)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/50 hover:bg-white/10 transition-all"
          >
            <ChevronDown className="w-4 h-4 flex-shrink-0" style={{ transform: collapsed ? "rotate(-90deg)" : "rotate(90deg)", transition: "transform 0.2s" }} />
            {!collapsed && <span style={{ fontSize: "0.8125rem" }}>Recolher</span>}
          </button>
          <button
            onClick={() => navigate("/app/perfil")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/50 hover:bg-white/10 transition-all"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {!collapsed && <span style={{ fontSize: "0.8125rem" }}>Sair para o app</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 bg-card border-b border-border flex-shrink-0" style={{ height: 72 }}>
          <p className="text-muted-foreground" style={{ fontSize: "0.8125rem" }}>
            {navItems.find(n => n.id === section)?.label}
          </p>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-muted rounded-xl px-3 py-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                placeholder="Busca rápida..."
                className="bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                style={{ fontSize: "0.875rem", width: 180 }}
              />
            </div>
            <button className="relative w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-border transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-destructive" />
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-border">
              <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
                <span className="text-primary" style={{ fontWeight: 700, fontSize: "0.75rem" }}>AP</span>
              </div>
              <div>
                <p className="text-foreground" style={{ fontWeight: 700, fontSize: "0.875rem" }}>Ana Paula</p>
                <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>Secretária</p>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground ml-1" />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-hidden">
          {section === "dashboard" && <DashboardSection onSectionChange={handleSectionChange} />}
          {section === "analytics" && <AnalyticsSection />}
          {section === "patients"  && <PatientsSection />}
          {section === "schedule"  && <ScheduleSection />}
          {section === "settings"  && <SettingsSection />}
        </main>
      </div>
    </div>
  );
}
