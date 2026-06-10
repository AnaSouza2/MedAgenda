import { useNavigate } from "react-router";
import { Search, Bell, Brain } from "lucide-react";
import { useState, useEffect } from "react";
import { db } from "../db";

const specialties = [
  { icon: "🩺", label: "Clínico\nGeral", color: "#E8F0F9" },
  { icon: "✨", label: "Dermato-\nlogista", color: "#FFF3E0" },
  { icon: "❤️", label: "Cardio-\nlogista", color: "#FCE4EC" },
  { icon: "🌸", label: "Gineco-\nlogista", color: "#F3E5F5" },
  { icon: "🧠", label: "Psicó-\nlogo", color: "#E0F2F1" },
];

export function HomeScreen() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ name: "Ana" });
  const [nextAppointment, setNextAppointment] = useState(null);

  useEffect(() => {
    const prof = db.getProfile();
    setProfile(prof);

    const appts = db.getAppointments();
    const next = appts.find(a => a.status !== "Cancelada");
    if (next) {
      setNextAppointment(next);
    } else {
      setNextAppointment(null);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-full bg-background">
      <div className="bg-primary px-5 pt-12 pb-8 rounded-b-[2rem]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-white/60" style={{ fontSize: "0.875rem" }}>Bem-vinda de volta 👋</p>
            <h1 className="text-white" style={{ fontSize: "1.5rem", fontWeight: 800 }}>Olá, {profile.name.split(" ")[0]}!</h1>
          </div>
          <button className="relative w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center">
            <Bell className="w-5 h-5 text-white" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-accent" />
          </button>
        </div>

        <button
          onClick={() => navigate("/app/buscar")}
          className="w-full flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5"
        >
          <Search className="w-5 h-5 text-muted-foreground" />
          <span className="text-muted-foreground" style={{ fontSize: "0.9375rem" }}>Buscar médico ou especialidade</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
        <div>
          <h2 className="text-foreground mb-4" style={{ fontSize: "1rem", fontWeight: 700 }}>Especialidades</h2>
          <div className="grid grid-cols-5 gap-2">
            {specialties.map(({ icon, label, color }) => (
              <button
                key={label}
                onClick={() => navigate("/app/buscar")}
                className="flex flex-col items-center gap-2 active:scale-95 transition-all"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{ background: color }}>
                  {icon}
                </div>
                <span className="text-foreground text-center leading-tight" style={{ fontSize: "0.625rem", fontWeight: 600, whiteSpace: "pre-line" }}>
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate("/app/assistente")}
          className="w-full bg-primary rounded-3xl p-5 text-left active:scale-95 transition-all"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center flex-shrink-0">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white/70" style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Assistente Inteligente</p>
              <h3 className="text-white mt-0.5" style={{ fontSize: "1rem", fontWeight: 700 }}>Não sabe qual médico procurar?</h3>
              <p className="text-white/60 mt-1" style={{ fontSize: "0.8125rem" }}>Descreva seus sintomas e receba uma sugestão</p>
              <div className="mt-3 inline-flex items-center gap-1.5 bg-white rounded-xl px-4 py-2">
                <span className="text-primary" style={{ fontSize: "0.8125rem", fontWeight: 700 }}>Usar assistente do app →</span>
              </div>
            </div>
          </div>
        </button>

        {nextAppointment && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-foreground" style={{ fontSize: "1rem", fontWeight: 700 }}>Próximas consultas</h2>
              <button onClick={() => navigate("/app/consultas")} className="text-primary" style={{ fontSize: "0.8125rem", fontWeight: 600 }}>Ver todas</button>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: nextAppointment.color || "#EEF2F7" }}>
                <span className="text-primary" style={{ fontWeight: 800 }}>{nextAppointment.avatar || "MC"}</span>
              </div>
              <div className="flex-1">
                <p className="text-foreground" style={{ fontWeight: 700, fontSize: "0.9375rem" }}>{nextAppointment.doctor}</p>
                <p className="text-muted-foreground" style={{ fontSize: "0.8125rem" }}>{nextAppointment.specialty}</p>
                <p className="text-primary mt-0.5" style={{ fontSize: "0.8125rem", fontWeight: 600 }}>📅 {nextAppointment.date} às {nextAppointment.time}</p>
              </div>
              <span className="px-2.5 py-1 rounded-xl text-accent" style={{ background: "#E8F8F2", fontSize: "0.6875rem", fontWeight: 700 }}>
                {nextAppointment.status}
              </span>
            </div>
          </div>
        )}

        <div className="bg-card border border-border rounded-2xl p-4 flex gap-4 items-center mb-6">
          <div className="text-3xl">💊</div>
          <div>
            <p className="text-foreground" style={{ fontWeight: 700, fontSize: "0.875rem" }}>Dica de saúde</p>
            <p className="text-muted-foreground" style={{ fontSize: "0.8125rem", lineHeight: 1.5 }}>Faça exames preventivos anualmente para manter sua saúde em dia.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
