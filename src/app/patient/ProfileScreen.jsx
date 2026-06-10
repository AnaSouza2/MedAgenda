import { useNavigate } from "react-router";
import { ChevronRight, User, Bell, Shield, HelpCircle, LogOut, LayoutDashboard } from "lucide-react";
import { useState, useEffect } from "react";
import { db } from "../db";

const menuItems = [
  { icon: User, label: "Meus dados", sub: "Nome, CPF, contato" },
  { icon: Bell, label: "Notificações", sub: "Lembretes e alertas" },
  { icon: Shield, label: "Privacidade", sub: "Dados e segurança" },
  { icon: HelpCircle, label: "Ajuda e suporte", sub: "Faq e contato" },
];

export function ProfileScreen() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ name: "Ana Paula Souza", email: "ana.paula@saudetotal.com", cpf: "123.456.789-00" });
  const [stats, setStats] = useState({ total: 3, active: 3, doctors: 3 });

  useEffect(() => {
    const p = db.getProfile();
    setProfile(p);

    const appts = db.getAppointments();
    const activeAppts = appts.filter(a => a.status !== "Cancelada").length;
    const docs = new Set(appts.map(a => a.doctor)).size;
    setStats({
      total: appts.length,
      active: activeAppts,
      doctors: docs || 0
    });
  }, []);

  const getInitials = (name) => {
    if (!name) return "AP";
    return name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();
  };

  return (
    <div className="flex flex-col min-h-full bg-background">
      <div className="bg-primary px-5 pt-12 pb-10 rounded-b-[2rem]">
        <h1 className="text-white mb-6" style={{ fontSize: "1.375rem", fontWeight: 800 }}>Perfil</h1>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <span className="text-white" style={{ fontWeight: 800, fontSize: "1.25rem" }}>{getInitials(profile.name)}</span>
          </div>
          <div>
            <h2 className="text-white" style={{ fontSize: "1.125rem", fontWeight: 700 }}>{profile.name}</h2>
            <p className="text-white/60" style={{ fontSize: "0.875rem" }}>{profile.email}</p>
            <p className="text-white/50" style={{ fontSize: "0.8125rem" }}>CPF: {profile.cpf}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4 pb-24">
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Consultas", value: stats.total },
            { label: "Ativas", value: stats.active },
            { label: "Médicos", value: stats.doctors }
          ].map(({ label, value }) => (
            <div key={label} className="bg-card border border-border rounded-2xl p-3 text-center">
              <p className="text-foreground" style={{ fontWeight: 800, fontSize: "1.25rem" }}>{value}</p>
              <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>{label}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/clinica")}
          className="w-full bg-secondary border border-primary/20 rounded-2xl p-4 flex items-center gap-3 active:scale-95 transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <LayoutDashboard className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-primary" style={{ fontWeight: 700, fontSize: "0.9375rem" }}>Painel da Secretaria</p>
            <p className="text-muted-foreground" style={{ fontSize: "0.8125rem" }}>Acesso ao dashboard da clínica</p>
          </div>
          <ChevronRight className="w-4 h-4 text-primary" />
        </button>

        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          {menuItems.map(({ icon: Icon, label, sub }) => (
            <button key={label} className="w-full flex items-center gap-4 px-4 py-4 active:bg-muted transition-all border-b border-border last:border-0">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-foreground" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>{label}</p>
                <p className="text-muted-foreground" style={{ fontSize: "0.8125rem" }}>{sub}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            // Limpa o estado se quiser, ou apenas volta pro splash
            navigate("/");
          }}
          className="w-full flex items-center gap-4 px-4 py-4 bg-card border border-border rounded-2xl active:bg-muted transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0">
            <LogOut className="w-5 h-5 text-destructive" />
          </div>
          <p className="text-destructive" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>Sair da conta</p>
        </button>

        <p className="text-center text-muted-foreground pb-4" style={{ fontSize: "0.75rem" }}>MedAgenda v1.0.0 · Todos os direitos reservados</p>
      </div>
    </div>
  );
}
